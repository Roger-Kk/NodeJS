const ui = (id) => document.getElementById(id);
// Endereço da API: o HTML pode ser aberto diretamente ou pelo Live Server.
const API_BASE_URL = "http://localhost:3000";
let tasks = [];
let filter = "todas";
let editingId = null;
let deletingId = null;
let busy = false;
let loaded = false;

ui("today").textContent = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  timeZone: "America/Sao_Paulo",
}).format(new Date());

function notify(message, error = false) {
  ui("notice").textContent = message;
  ui("notice").classList.toggle("error", error);
  ui("notice").hidden = !message;
}

// As tarefas são lidas e gravadas no backend, sem armazenamento local.
async function api(method, path = "/tarefas", body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: body === undefined ? {} : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
    const raw = await response.text();
    let data = null;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      /* Não exibe erros HTML ao usuário. */
    }
    if (!response.ok)
      throw new Error(
        response.status === 404
          ? "Essa tarefa não está mais disponível. Atualize a lista."
          : response.status >= 500
            ? "Não foi possível realizar a operação. Tente novamente em instantes."
            : data?.erro ||
              data?.error ||
              "Não foi possível salvar. Confira os dados e tente novamente.",
      );
    return data;
  } catch (error) {
    if (error.name === "AbortError")
      throw new Error(
        "A conexão demorou demais. Verifique o servidor e tente novamente.",
      );
    if (error instanceof TypeError)
      throw new Error(
        "Não foi possível conectar. Verifique se o servidor está ligado e tente novamente.",
      );
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function setBusy(value) {
  busy = value;
  document.querySelectorAll("button, .task-check").forEach((control) => {
    control.disabled = value;
  });
  ui("task-list").setAttribute("aria-busy", String(value));
}

async function action(work, errorTarget) {
  if (busy) return;
  setBusy(true);
  try {
    await work();
  } catch (error) {
    if (errorTarget) {
      ui(errorTarget).textContent = error.message;
      ui(errorTarget).hidden = false;
    } else notify(error.message, true);
  } finally {
    setBusy(false);
  }
}

function icon(type) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    type === "edit"
      ? "M16 3l5 5-12 12H4v-5L16 3zm-3 3l5 5"
      : "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7",
  );
  svg.append(path);
  return svg;
}

function render() {
  const completed = tasks.filter((task) => task.concluida).length;
  const pending = tasks.length - completed;
  const percent = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;
  ui("total").textContent = tasks.length;
  ui("pending").textContent = pending;
  ui("done").textContent = completed;
  ui("nav-total").textContent = tasks.length;
  ui("nav-pending").textContent = pending;
  ui("nav-done").textContent = completed;
  ui("percent").textContent = `${percent}%`;
  ui("progress").value = percent;
  ui("progress").textContent = `${percent}%`;
  ui("progress-description").textContent = tasks.length
    ? `${completed} de ${tasks.length} tarefas concluídas. ${pending ? "Siga no seu ritmo." : "Tudo em dia. Aproveite essa conquista!"}`
    : "Sua próxima conquista começa com uma nova tarefa.";
  const query = ui("search").value.trim().toLocaleLowerCase("pt-BR");
  const visible = tasks.filter(
    (task) =>
      (filter === "todas" ||
        (filter === "concluidas"
          ? Boolean(task.concluida)
          : !task.concluida)) &&
      String(task.titulo ?? "")
        .toLocaleLowerCase("pt-BR")
        .includes(query),
  );
  ui("list-title").firstChild.textContent =
    `${{ todas: "Todas as tarefas", pendentes: "Pendentes", concluidas: "Concluídas" }[filter]} `;
  ui("visible-count").textContent = visible.length;
  ui("list-description").textContent =
    `${visible.length} ${visible.length === 1 ? "tarefa exibida" : "tarefas exibidas"}`;
  ui("task-list").replaceChildren();
  ui("loading").hidden = true;
  ui("empty").hidden = visible.length > 0 || !loaded;
  ui("empty-add").hidden = tasks.length > 0;
  ui("empty-title").textContent = tasks.length
    ? "Nenhuma tarefa por aqui."
    : "Tudo começa com uma tarefa.";
  ui("empty-description").textContent = tasks.length
    ? "Experimente outro filtro ou outra busca."
    : "Adicione o que você quer fazer e dê o primeiro passo.";
  visible.forEach((task) => {
    const item = document.createElement("li");
    item.className = `task-row${task.concluida ? " completed" : ""}`;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = Boolean(task.concluida);
    checkbox.disabled = busy;
    checkbox.setAttribute(
      "aria-label",
      `${task.concluida ? "Reabrir" : "Concluir"} tarefa: ${task.titulo}`,
    );
    checkbox.addEventListener("change", () => {
      const done = checkbox.checked;
      checkbox.checked = Boolean(task.concluida);
      action(async () => {
        const updated = await api(
          "PUT",
          `/tarefas/${encodeURIComponent(task.id)}`,
          { concluida: done },
        );
        tasks = tasks.map((current) =>
          current.id === task.id ? updated : current,
        );
        render();
        notify(
          done
            ? "Tarefa concluída. Mais um passo dado!"
            : "Tarefa movida para pendentes.",
        );
      });
    });
    const name = document.createElement("span");
    name.className = "task-name";
    name.textContent = task.titulo ?? "Sem título";
    const status = document.createElement("span");
    status.className = "task-status";
    status.textContent = task.concluida ? "Concluída" : "Pendente";
    const buttons = document.createElement("div");
    buttons.className = "row-actions";
    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "icon-button";
    edit.setAttribute("aria-label", `Editar tarefa: ${task.titulo}`);
    edit.title = "Editar tarefa";
    edit.append(icon("edit"));
    edit.addEventListener("click", () => openForm(task));
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "icon-button delete";
    remove.setAttribute("aria-label", `Excluir tarefa: ${task.titulo}`);
    remove.title = "Excluir tarefa";
    remove.append(icon("delete"));
    remove.addEventListener("click", () => {
      deletingId = task.id;
      ui("delete-description").textContent =
        `Você quer excluir “${task.titulo}”?`;
      ui("delete-error").hidden = true;
      ui("delete-dialog").showModal();
      ui("cancel-delete").focus();
    });
    edit.disabled = remove.disabled = busy;
    buttons.append(edit, remove);
    item.append(checkbox, name, status, buttons);
    ui("task-list").append(item);
  });
}

async function loadTasks() {
  const result = await api("GET");
  const items = Array.isArray(result) ? result : result?.itens;
  if (!Array.isArray(items))
    throw new Error(
      "Não foi possível carregar suas tarefas. Tente atualizar novamente.",
    );
  tasks = items;
  loaded = true;
  render();
}

function openForm(task) {
  editingId = task?.id ?? null;
  ui("task-form").reset();
  ui("task-title").value = task?.titulo ?? "";
  ui("task-done").checked = Boolean(task?.concluida);
  ui("dialog-title").textContent = task ? "Editar tarefa" : "Nova tarefa";
  ui("save-task").textContent = task ? "Salvar alterações" : "Criar tarefa";
  ui("form-error").hidden = true;
  ui("task-dialog").showModal();
  ui("task-title").focus();
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
    render();
  });
});
ui("search").addEventListener("input", () => {
  if (loaded) render();
});
ui("new-task").addEventListener("click", () => openForm());
ui("empty-add").addEventListener("click", () => openForm());
["cancel-dialog", "close-dialog"].forEach((id) =>
  ui(id).addEventListener("click", () => ui("task-dialog").close()),
);
ui("cancel-delete").addEventListener("click", () =>
  ui("delete-dialog").close(),
);
["task-dialog", "delete-dialog"].forEach((id) =>
  ui(id).addEventListener("cancel", (event) => {
    if (busy) event.preventDefault();
  }),
);

ui("task-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = ui("task-title").value.trim();
  if (!title) {
    ui("form-error").textContent = "Escreva um título para sua tarefa.";
    ui("form-error").hidden = false;
    ui("task-title").focus();
    return;
  }
  const id = editingId;
  action(async () => {
    ui("form-error").hidden = true;
    const saved = await api(
      id === null ? "POST" : "PUT",
      id === null ? "/tarefas" : `/tarefas/${encodeURIComponent(id)}`,
      {
        titulo: title,
        concluida: ui("task-done").checked,
        dataCriacao: new Date().toISOString(),
      },
    );
    ui("task-dialog").close();
    tasks =
      id === null
        ? [...tasks, saved]
        : tasks.map((task) => (task.id === id ? saved : task));
    render();
    notify(
      id === null
        ? "Tarefa criada. Vamos dar o próximo passo?"
        : "Alterações salvas.",
    );
    try {
      await loadTasks();
    } catch {
      notify(
        "A tarefa foi salva, mas não conseguimos atualizar a lista completa. Clique em Atualizar para tentar novamente.",
        true,
      );
    }
  }, "form-error");
});

ui("confirm-delete").addEventListener("click", () =>
  action(async () => {
    ui("delete-error").hidden = true;
    const id = deletingId;
    await api("DELETE", `/tarefas/${encodeURIComponent(id)}`);
    tasks = tasks.filter((task) => task.id !== id);
    ui("delete-dialog").close();
    render();
    notify("Tarefa excluída.");
  }, "delete-error"),
);

ui("refresh").addEventListener("click", () =>
  action(async () => {
    await loadTasks();
    notify("Sua lista está atualizada.");
  }),
);
action(async () => {
  try {
    await loadTasks();
  } finally {
    ui("loading").hidden = true;
  }
});
