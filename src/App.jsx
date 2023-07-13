import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import HomeContent from "./pages/HomePage/HomeContent";
import { useEffect } from "react";
import './App.scss'
import AuthPage from "./pages/AuthPage/AuthPage";
import { fetchAccount } from "./service/api";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { handleDispatchLogin, handleDispatchLogout } from "./redux/slice/accountSlice";
import Page404 from "./pages/ErrorPage/Page404";
import LayoutAdmin from "./pages/AdminPage/LayoutAdmin";
import ProtectRoute from "./pages/ErrorPage/ProtectRoute";
import Dashboard from "./pages/AdminPage/Dashboard/Dashboard";
import ManageUsers from "./pages/AdminPage/ManageUsers/ManageUsers";
import ManageBooks from "./pages/AdminPage/ManageBooks/ManageBooks";
import ManageOrders from "./pages/AdminPage/ManageOrders/ManageOrders";
import DetailBook from "./pages/DetailPage/DetailBook";
import Order from "./pages/OrderPage/Order";
import CheckOutPage from "./pages/CheckoutPage/CheckOut";
import History from "./pages/HistoryPage/History";
import Account from "./pages/AccountPage/Account";


const LayoutHomePage = () => {
  return (
    <>
      <Header />
      <Outlet />

    </>
  )
}

const LayoutAdminPage = (props) => {
  const { dataUser } = props


  return (
    <>
      {dataUser?.info?.role == "ADMIN" ?
        <LayoutAdmin dataUser={dataUser} >
          <Outlet />
        </LayoutAdmin> :
        <Outlet />}

    </>
  )
}




const App = () => {
  const dispatch = useDispatch()
  const fetchAccountUser = async () => {

    if (window.location.pathname === '/auth') {
      return
    }
    let res = await fetchAccount()
    console.log(res)
    if (res && res.data) {
      dispatch(handleDispatchLogin(res.data))
    } else {
      dispatch(handleDispatchLogout())
    }



  }

  const dataUser = useSelector(state => state.account)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutHomePage />,
      errorElement: <Page404 />,
      children: [
        {
          index: true,
          element: <HomeContent />
        },
        {
          path: 'auth',
          element: <AuthPage />
        },
        {
          path: 'order',
          element: <Order />,

        },
        {
          path: 'history',
          element: <History />,

        },
        {
          path: 'account',
          element: <Account />,

        },
        {
          path: 'order/checkout',
          element: <CheckOutPage />,

        },
        {
          path: 'book/:slug',
          element: <DetailBook />
        }

      ]
    },
    {
      path: "/admin",
      element: <LayoutAdminPage dataUser={dataUser} />,
      errorElement: <Page404 />,
      children: [
        {
          index: true,
          element: <ProtectRoute dataUser={dataUser}><Dashboard /></ProtectRoute>
        },
        {
          path: 'manage-users',
          element: <ManageUsers />
        },
        {
          path: 'manage-books',
          element: <ManageBooks />
        },
        {
          path: 'manage-orders',
          element: <ManageOrders />
        }

      ]
    },
  ]);


  useEffect(() => {
    fetchAccountUser()
  }, [])

  console.log('dataUser', dataUser)
  return <RouterProvider router={router} />
}

export default App