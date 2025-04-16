
import GameGrid from "@/components/game-grid"
import { defaultGamelist } from "@/data/game";

export default function HomePage() {

    return (
        <div>
            <div className="min-h-screen">
                <div className="min-h-screen max-w-12/12 m-0 mx-auto xl:max-w-11/12  ">
                    <div className="mx-auto px-4 py-6">
                        <GameGrid gameMobileLength={100} gamePcLength={100} gamelist={defaultGamelist.filter((game) => game.isfunny === "1")} />
                    </div>
                </div>
            </div>
        </div>
    );
}