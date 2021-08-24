import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SITE_ROUTES } from "../../sites/site/containers/misc/Routes/routes";
import { IRootState } from "../../store/reducers";
import { IWithoutAuthComponentProps } from "./WithoutAuth";

const WithoutAuthHooks = (props: IWithoutAuthComponentProps) => {
    const { userState } = useSelector((state: IRootState) => state)
    const history = useHistory();

    const rerouteUrl = SITE_ROUTES.contactUs.route;

    const validateAuthentication = () => {
        if (userState.authenticated) {
            history.push(rerouteUrl);
        } else if (!props.isAllowed) {
            history.push(rerouteUrl);
        }
    };

    return {
        validateAuthentication,
    };
};

export default WithoutAuthHooks;
