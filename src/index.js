import React from "react"
import ReactDOM from "react-dom/client"
import "./index.scss"
import reportWebVitals from "./reportWebVitals"
import RoutePages from "./routes/routePages"
import "bootstrap/dist/css/bootstrap.min.css"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { configureStore, persistor } from "./redux/store"
import { ThemeProvider } from "@mui/material"
import { theme } from "./utils"

const root = ReactDOM.createRoot(document.getElementById("root"))
const store = configureStore()
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RoutePages />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
