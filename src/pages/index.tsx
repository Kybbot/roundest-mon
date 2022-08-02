import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";

const Home: NextPage = () => {
	return (
		<main className="h-screen w-screen flex flex-col justify-center items-center">
			<h1 className="text-2xl text-center pt-8 m-3">Which Pokémon is Rounder?</h1>
			<div className="border rounded p-8 flex justify-between items-center max-w-2xl">
				<div className="w-16 h-16 bg-red-200"></div>
				<div className="p-8">Vs</div>
				<div className="w-16 h-16 bg-red-200"></div>
			</div>
		</main>
	);
};

export default Home;
