import { io } from "../http";
import { ConnectionService } from "../services/ConnectionService";
import { MessageService } from "../services/MessageService";

io.on("connect", async (socket) => {
  const connectionService = new ConnectionService();
  const messageService = new MessageService();
  const allConnectionWithoutAdmin = await connectionService.findAllWithoutAdmin();
  io.emit("admin_list_all_users", allConnectionWithoutAdmin);
  socket.on("admin_list_messages_by_user", async (params, callback) => {
    const { user_id } = params;
    const allMessages = await messageService.listByUser(user_id);
    callback(allMessages);
  });
});
