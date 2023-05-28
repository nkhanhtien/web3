// Pages
import Home from "../Home/Home";
import Login from "../pages/Login";
import PurchaseCustomer from "../pages/Customer/PurchaseCustomer";
import ReceiveCustomer from "../pages/Customer/ReceiveCustomer";
import ReceivedByCustomer from "../pages/Customer/ReceivedByCustomer";
import ReceiveDeliveryHub from "../pages/DeliveryHub/ReceiveDeliveryHub";
import ShipDeliveryHub from "../pages/DeliveryHub/ShipDeliveryHub";
import Manufacture from "../pages/Manufacturer/Manufacture";
import AllManufacture from "../pages/Manufacturer/AllManufacture";
import ShipManufacture from "../pages/Manufacturer/ShipManufacture";
import ReceiveThirdParty from "../pages/ThirdParty/ReceiveThirdParty";
import ShipThirdParty from "../pages/ThirdParty/ShipThirdParty";
import PurchaseThirdParty from "../pages/ThirdParty/PurchaseThirdParty";
import configRoutes from "./configRoutes";

// Public routes
const publicRoutes = [{ path: configRoutes.login, component: Login }];

const privateRoutes = [
  { path: configRoutes.home, component: Home },
  // Customer
  { path: configRoutes.customerBuy, component: PurchaseCustomer },
  { path: configRoutes.customerReceive, component: ReceiveCustomer },
  { path: configRoutes.customerAllReceive, component: ReceivedByCustomer },

  // Delivery
  { path: configRoutes.deliveryHubReceive, component: ReceiveDeliveryHub },
  { path: configRoutes.deliveryHubShip, component: ShipDeliveryHub },

  // Manufacture
  { path: configRoutes.manufacture, component: Manufacture },
  { path: configRoutes.allManufacture, component: AllManufacture },
  { path: configRoutes.manufacturerShip, component: ShipManufacture },

  // ThirdParty
  { path: configRoutes.thirdPartyAllProduct, component: PurchaseThirdParty },
  { path: configRoutes.thirdPartyReceive, component: ReceiveThirdParty },
  { path: configRoutes.thirdPartyShip, component: ShipThirdParty },
];

export { publicRoutes, privateRoutes };
