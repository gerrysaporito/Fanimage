import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { removeAlert } from "../../../../../store/actions/alert";
import { IRootState } from "../../../../../store/reducers";

const AlertHooks = () => {
    const dispatch = useDispatch();
    const alertState = useSelector((state: IRootState) => state.alertState);
    const history = useHistory();

    const closeAlert = () => {
        dispatch(removeAlert());
    }

    const handleCloseAlert = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        closeAlert();
    }

    return {
        history,
        alertState,
        closeAlert,
        handleCloseAlert,
    };
};

export default AlertHooks;
