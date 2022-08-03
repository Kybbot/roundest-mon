import React from "react";
import type { NextPage } from "next";
import Image from "next/image";

import { trpc } from "@/utils/trpc";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { inferQueryResponse } from "./api/trpc/[trpc]";

const btn =
	"inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const Home: NextPage = () => {
	const [ids, updateIds] = React.useState(() => getOptionsForVote());

	const [first, second] = ids;

	const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
	const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

	const voteForRoundest = (selected: number) => {
		updateIds(getOptionsForVote());
	};

	return (
		<main className="h-screen w-screen flex flex-col justify-center items-center">
			<h1 className="text-2xl text-center pt-8 m-3">Which Pokémon is Rounder?</h1>
			<div className="p-8 flex justify-between items-center max-w-2xl">
				{!firstPokemon.isLoading && firstPokemon.data && !secondPokemon.isLoading && secondPokemon.data && (
					<>
						<PokemonListing pokemon={firstPokemon.data} vote={() => voteForRoundest(first)} />
						<div className="p-8">Vs</div>
						<PokemonListing pokemon={secondPokemon.data} vote={() => voteForRoundest(second)} />
					</>
				)}
			</div>
		</main>
	);
};

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: React.FC<{ pokemon: PokemonFromServer; vote: () => void }> = ({ pokemon, vote }) => {
	return (
		<div className="flex flex-col items-center">
			<p className="text-xl text-center capitalize">{pokemon.name}</p>
			<div className="w-64 h-64 relative">
				<Image layout="fill" objectFit="cover" src={pokemon.sprites.front_default} alt={pokemon.name} />
			</div>
			<button className={btn} type="button" onClick={vote}>
				Rounder
			</button>
		</div>
	);
};

export default Home;
