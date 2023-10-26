import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    quantity: number;
}

const RestaurantMenu: React.FC = () => {
    const [cartItems, setCartItems] = useState<number>(0);
    const [products, setProducts] = useState<Product[]>([
        {
            id: 11,
            name: "Pizza",
            description: "Deliciosa pizza con queso y pepperoni",
            price: "$10.99",
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
            quantity: 0,
        },
        {
            id: 72,
            name: "Hamburguesa",
            description: "Hamburguesa con carne, lechuga y tomate",
            price: "$8.99",
            image: "https://img.freepik.com/foto-gratis/sabrosa-hamburguesa-aislada-sobre-fondo-blanco-comida-rapida-hamburguesa-fresca-carne-queso_90220-1063.jpg?w=2000",
            quantity: 0,
        },
        {
            id: 63,
            name: "Sushi",
            description: "Variedad de sushi fresco",
            price: "$12.99",
            image: "https://cdn.pixabay.com/photo/2018/08/03/08/33/food-3581341_1280.jpg",
            quantity: 0,
        },
        {
            id: 61,
            name: "Pizza",
            description: "Deliciosa pizza con queso y pepperoni",
            price: "$10.99",
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
            quantity: 0,
        },
        {
            id: 52,
            name: "Hamburguesa",
            description: "Hamburguesa con carne, lechuga y tomate",
            price: "$8.99",
            image: "https://img.freepik.com/foto-gratis/sabrosa-hamburguesa-aislada-sobre-fondo-blanco-comida-rapida-hamburguesa-fresca-carne-queso_90220-1063.jpg?w=2000",
            quantity: 0,
        },
        {
            id: 13,
            name: "Sushi",
            description: "Variedad de sushi fresco",
            price: "$12.99",
            image: "https://cdn.pixabay.com/photo/2018/08/03/08/33/food-3581341_1280.jpg",
            quantity: 0,
        },
        {
            id: 1,
            name: "Pizza",
            description: "Deliciosa pizza con queso y pepperoni",
            price: "$10.99",
            image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
            quantity: 0,
        },
        {
            id: 22,
            name: "Hamburguesa",
            description: "Hamburguesa con carne, lechuga y tomate",
            price: "$8.99",
            image: "https://img.freepik.com/foto-gratis/sabrosa-hamburguesa-aislada-sobre-fondo-blanco-comida-rapida-hamburguesa-fresca-carne-queso_90220-1063.jpg?w=2000",
            quantity: 0,
        },
        {
            id: 65,
            name: "Sushi",
            description: "Variedad de sushi fresco",
            price: "$12.99",
            image: "https://cdn.pixabay.com/photo/2018/08/03/08/33/food-3581341_1280.jpg",
            quantity: 0,
        },
        {
            id: 12,
            name: "Sushi",
            description: "Variedad de sushi fresco",
            price: "$12.99",
            image: "https://cdn.pixabay.com/photo/2018/08/03/08/33/food-3581341_1280.jpg",
            quantity: 0,
        },
    ]);

    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (productId: number) => {
        const updatedProducts = products.map((product) => {
            if (product.id === productId) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        });
        setProducts(updatedProducts);
        setCartItems(cartItems + 1);
    };

    const removeFromCart = (productId: number) => {
        const updatedProducts = products.map((product) => {
            if (product.id === productId && product.quantity > 0) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        });
        setProducts(updatedProducts);
        setCartItems(cartItems > 0 ? cartItems - 1 : 0);
    };

    const handleOpenCart = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Nombre del Restaurante
                    </Typography>
                    <IconButton color="inherit" onClick={handleOpenCart}>
                        <Badge badgeContent={cartItems} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container>
                <Box mt={4}>
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product.id}>
                                <Card>
                                    <CardMedia component="img" height="140" image={product.image} alt={product.name} />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {product.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.description}
                                        </Typography>
                                        <Typography variant="h6" color="text.primary">
                                            {product.price}
                                        </Typography>
                                        {product.quantity === 0 ? (
                                            <Button onClick={() => addToCart(product.id)} variant="contained" fullWidth>
                                                Añadir al carrito
                                            </Button>
                                        ) : (
                                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                                <IconButton onClick={() => removeFromCart(product.id)} color="primary">
                                                    {product.quantity === 1 ? <DeleteIcon /> : <RemoveIcon />}
                                                </IconButton>
                                                <Typography variant="h6" color="text.primary">
                                                    {product.quantity}
                                                </Typography>
                                                <IconButton onClick={() => addToCart(product.id)} color="primary">
                                                    <AddIcon />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
            <Dialog open={isCartOpen} onClose={handleCloseCart} fullWidth>
                <DialogTitle>Carrito de Compras</DialogTitle>
                <DialogContent>
                    <List>
                        {products.map((product) =>
                            product.quantity > 0 ? (
                                <ListItem key={product.id}>
                                    <ListItemText primary={product.name} secondary={`Cantidad: ${product.quantity}`} />
                                    <ListItemSecondaryAction>
                                        <Typography variant="body1">{product.price}</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ) : null
                        )}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCart} color="primary">
                        Cerrar
                    </Button>
                    <Button variant="contained" color="primary">
                        Realizar Pedido
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RestaurantMenu;

/*    */
