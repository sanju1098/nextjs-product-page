import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Grid,
} from "@mui/material";
import Link from "next/link";
import styles from "./page.module.css";

async function getData() {
	const res = await fetch("https://dummyjson.com/products");

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

export default async function Page() {
	const { products } = await getData();

	return (
		<>
			<Grid container spacing={2}>
				{products.map((product: any) => (
					<Card className={styles.cardmain} key={product.id}>
						<CardMedia
							className={styles.cardMediaHeight}
							image={product.thumbnail}
							title={product.title}
						/>
						<CardContent>
							<Typography gutterBottom variant="h5" component="div">
								{product.title}
							</Typography>
							<Typography variant="body2" color="000">
								{product.description}
							</Typography>
							<Typography gutterBottom variant="h5" component="div">
								Price: Rs {product.price}/-
							</Typography>
						</CardContent>
						<CardActions>
							<Link href={`/product/${product.id}`}>
								<Button variant="contained" size="small">
									View Full Details
								</Button>
							</Link>
						</CardActions>
					</Card>
				))}
			</Grid>
		</>
	);
}
