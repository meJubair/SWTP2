import { PORT } from "./utils/config";
import app from "./app";

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
