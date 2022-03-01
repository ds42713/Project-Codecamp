import { useContext, useEffect, useRef } from "react";
import { ErrorContext } from "./contexts/ErrorContext";
import RouteConfig from "./routes/RouteConfig";

function App() {
    const { error } = useContext(ErrorContext)

    return (
        <div>
            <RouteConfig />
        </div>
    );
}

export default App;
