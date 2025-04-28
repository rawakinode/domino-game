<template>
    <div
        style="margin-top: 80px;font-size: 24px;text-align: center;font-family: 'Bangers'; font-size: 2.2rem;color: white;">
        HOW TO PLAY
    </div>
    <div class="box fullscreen-box howtoplay" style="overflow-y: auto;overflow-x: hidden;">
        <h1>Domino Bala PVP Game Guide</h1>
        
        <h2>1. How to Start the Game</h2>
        <ul>
            <li><strong>Create a Game:</strong> The first player creates a game by placing a bet (e.g., 0.1 ETH).</li>
            <li><strong>Join a Game:</strong> The second player joins with the same bet, and the game begins.</li>
            <li><strong>Game Fee:</strong> Both player will required fee 0.001 Monad per games.</li>
        </ul>

        <h2>2. How to Play</h2>
        <ul>
            <li><strong>Receiving Cards:</strong> Each player will receive 2 random domino cards, visible only to them.</li>
            <li><strong>Confirmation Phase:</strong> Players must choose to continue or withdraw within 24 Hours.</li>
            <li><strong>If a player withdraws:</strong> 50% of their bet is given to the opponent.</li>
            <li><strong>If both players withdraw:</strong> The bet is refunded to both players.</li>
        </ul>

        <h2>3. How to Determine the Winner</h2>
        <ul>
            <li><strong>Paired Cards (Bala):</strong> Paired cards (0-0, 1-1, etc.) are called Bala. The higher the Bala value, the stronger the ranking.</li>
            <li><strong>Winning Rules:</strong></li>
            <ul>
                <li>If a player has two Bala cards, they win.</li>
                <li>If both players have two Bala cards, the higher value wins.</li>
                <li>If only one player has one Bala card, the other card's value is compared (maximum 9).</li>
                <li>If no Bala cards are present, the total value of both cards is counted, with tens counted as 0.</li>
            </ul>
        </ul>

        <h2>4. Additional</h2>
        <ul>
            <li>Players can check the result after both have chosen "continue" or "withdraw".</li>
            <li>One player presses the "View Result" button for automatic calculation.</li>
            <li>The game result and winner will be stored in the system.</li>
            <li>The reward is automatically sent to the winner.</li>
        </ul>
        
    </div>
</template>

<style scoped>
 .howtoplay {
    background-color: rgb(63 7 112);
    color: white;
    font-family:'Courier New', Courier, monospace;
    font-size: 1rem;
 }
</style>