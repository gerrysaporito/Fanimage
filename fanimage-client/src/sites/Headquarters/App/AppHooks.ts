import { useSelector } from "react-redux";
import { IRootState } from "../../../store/reducers";

const AppHooks = () => {

    const { themeState } = useSelector((state: IRootState) => state);

    return {
        themeState,
    };
};

export default AppHooks;
