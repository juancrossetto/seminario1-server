const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors"); //npm i cors
const cron = require("node-cron");
const {
  getAllTokens,
  sendPushNotification,
  getTokenByEmail,
} = require("./services/pushNotificationService");

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// habilitar cors
app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));

// puerto de la app
const port = process.env.PORT || 4000;

// Importar rutas
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/incomes", require("./routes/incomes"));
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/loans", require("./routes/loans"));
app.use("/api/budgets", require("./routes/budgets"));
app.use("/api/investments", require("./routes/investments"));
app.use("/api/bankaccounts", require("./routes/bankAccounts"));
app.use("/api/creditCards", require("./routes/creditCards"));
app.use("/api/weeklymaturities", require("./routes/maturities"));
app.use("/api/cabify", require("./routes/cabify"))
app.use("/api/uber", require("./routes/uber"))

app.use("/api/pushNotifications", require("./routes/pushNotification"));

// arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});

//* * * * * una vez por minuto
//0 */4 * * *  una vez cada 4 hs
cron.schedule("0 */4 * * *", () => {
  //Envia Push notifications si detecta tarjetas de credito vencidas
  PushNotificationSchedule();
});

const PushNotificationSchedule = async () => {
  try {
    const tokens = await getAllTokens();
    const today = new Date();
    //recorremos por cada token/email
    for (const token of tokens) {
      const response = await sendPushNotification(
        token.token,
        "Passenger!! 🚗",
        `${token.name} Viaja mas barato y seguro a traves de Passenger 💳`
      );
      console.log(response, "Envío Push Notification Passenger");
    }
  } catch (error) {
    console.log(
      "Error en Proceso Batch de Envío Push Notification Passenger",
      error
    );
  }
};
