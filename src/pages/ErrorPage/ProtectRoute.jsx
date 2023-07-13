import Page403 from "./Page403"
import PageNotLogin from "./PageNotLogin"

const ProtectRoute = (props) => {
    const { dataUser } = props
    console.log('datauser', dataUser)
    if (dataUser.isAuthenticated == false) {
        return (<PageNotLogin />)
    } else {
        if (dataUser?.info?.role == "USER") {
            return <Page403 />
        } else {
            return props.children
        }
    }
}

export default ProtectRoute