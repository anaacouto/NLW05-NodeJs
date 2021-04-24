const socket = io();
let connectionsUsers = [];

socket.on("admin_list_all_users", (connections) => {
  document.getElementById("list_users").innerHTML = "";
  connectionsUsers = connections;
  let template = document.getElementById("template").innerHTML;

  connections.forEach((connection) => {
    const rendered = Mustache.render(template, {
      id: connection.socket_id,
      email: connection.user.email,
    });
    document.getElementById("list_users").innerHTML += rendered;
  });
});

function call(id) {
  const connection = connectionsUsers.find(
    (connection) => connection.socket_id === id
  );
  const template = document.getElementById("admin_template").innerHTML;
  const rendered = Mustache.render(template, {
    email: connection.user.email,
    id: connection.user_id,
  });
  document.getElementById("supports").innerHTML += rendered;
  const params = { user_id: connection.user_id };
  socket.emit("admin_list_messages_by_user", params, (messages) => {
    const divMessages = document.getElementById(
      `allMessages${connection.user_id}`
    );
    messages.forEach((message) => {
      const createDiv = document.createElement("div");
      if (message.admin_id === null) {
        console.log(connection);
        createDiv.className = "admin_message_client";
        createDiv.innerHTML = `<span>${connection.user.email} - ${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(
          message.created_at
        ).format("DD/MM/YYYY HH:mm:ss")}</span>`;
      } else {
        createDiv.className = "admin_message_admin";
        createDiv.innerHTML = `<span>Atendente: ${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(
          message.created_at
        ).format("DD/MM/YYYY HH:mm:ss")}</span>`;
      }
      divMessages.appendChild(createDiv);
    });
  });
}
