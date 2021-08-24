import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SITE_ROUTES } from "../../sites/site/containers/misc/Routes/routes";
import { IRootState } from "../../store/reducers";
import { IWithAuthComponentProps } from "./WithAuth";

const WithAuthHooks = (props: IWithAuthComponentProps) => {
    const { userState } = useSelector((state: IRootState) => state)
    const history = useHistory();

    const validateAuthentication = () => {

        if (!userState.authenticated) {
            history.push(SITE_ROUTES.login.route);
        } else if (!props.isAllowed) {
            history.push(SITE_ROUTES.login.route);
        }

    };

    return {
        validateAuthentication,
    };
};

export default WithAuthHooks;
