import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Hidden from "@mui/material/Hidden";
import { ListItemButton, ListItemIcon } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { NavLink } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsDrawerOpen(open);
    };

  const itemsNavList = [
    {
      text: "Productos",
      icon: <InboxIcon />,
      redirecTo: "/admin/products",
    },
    {
      text: "Pedidos",
      icon: <MailIcon />,
      redirecTo: "/admin/orders",
    },
  ];

  const itemNavList = itemsNavList.map((item, index) => (
    <ListItem key={index} disablePadding>
      <NavLink to={item.redirecTo}>
        <ListItemButton>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </NavLink>
    </ListItem>
  ));
  
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Seminario App
          </Typography>
          <Hidden smDown>
            <Button color="inherit">Productos</Button>
            <Button color="inherit">Pedidos</Button>
          </Hidden>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {<List>{itemNavList}</List>}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavigationBar;
