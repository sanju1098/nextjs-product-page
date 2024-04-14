import React from "react";
import { Typography } from "@mui/material";
import styles from "../../page.module.css";

interface SingleProductProps {
	params: {
		id: string;
		title: string;
		description: string;
		price: string | number;
		discountPercentage: string | number;
		rating: number;
		stock: number;
		brand: string;
		category: string;
		thumbnail: string;
		images: string[];
	};
}

const SingleProduct: React.FC<SingleProductProps> = async ({ params }) => {
	const fetchData = async () => {
		try {
			const res = await fetch(`https://dummyjson.com/products/${params.id}`);
			if (!res.ok) {
				throw new Error("Failed to fetch data");
			}
			return await res.json();
		} catch (error) {
			console.error("Error fetching data:", error);
			return null;
		}
	};

	const product = await fetchData();

	if (!product) {
		return <div>Loading...</div>;
	}

	return (
		<div className={styles.singleProductContainer}>
			<div className={styles.productDiv}>
				<img
					key={product.title}
					src={product.thumbnail}
					alt={product.title}
					className={styles.mainImage}
				/>
				<div className={styles.singleProductContainer}>
					{product.images.map((imageUrl: string, index: number) => (
						<img
							key={index}
							src={imageUrl}
							alt={`Product Image ${index + 1}`}
							className={styles.subImage}
						/>
					))}
				</div>
			</div>
			<div className={styles.productDiv}>
				<Typography variant="h4" gutterBottom>
					{product.title}
				</Typography>
				<Typography variant="body1" paragraph>
					{product.description}
				</Typography>
				<Typography variant="body1" paragraph>
					Price: Rs {product.price}/-
				</Typography>
				<Typography variant="body1" paragraph>
					Discount: {product.discountPercentage}%
				</Typography>
				<Typography variant="body1" paragraph>
					Rating: {product.rating}
				</Typography>
				<Typography variant="body1" paragraph>
					Stock: {product.stock}
				</Typography>
				<Typography variant="body1" paragraph>
					Brand: {product.brand}
				</Typography>
				<Typography variant="body1" paragraph>
					Category: {product.category}
				</Typography>
			</div>
		</div>
	);
};

export default SingleProduct;
