//This is the JavaScript file that will handle the attack function  

//Declaring variables to represent the number of dice used by the attacker and defender after user input is scanned in
var numAttackDice;
var numDefendDice;

//Assigns the number of dice used by the attacker based on user input
var userAttackDice = prompt("Please enter the number of dice the attacker will roll (1-3)");
if(userAttackDice !== null)
{
    numAttackDice = userAttackDice;
}

//Assigns the number of dice used by the defender based on user input
var userDefendDice = prompt("Please enter the number of dice the attacker will roll (1-2)");
if(userDefendDice !== null)
{
    numDefendDice = userDefendDice;
}


//Creates an array to hold the attacker dice values to be compared later
var attackDice = new Array();

//Fills array with random possible dice values of 1-6
for(i = 0; i < numAttackDice; i++)
{
    var tempDice = Math.floor((Math.random() * 6) + 1);
    attackDice[i] = tempDice;
}

//Testing output results
console.log("Attackers rolled : " +attackDice.toString());

//Creates an array to hold the defenders dice values to be compared later
var defendDice = new Array();

//Fills the array with random possible dice values of 1-6
for(i = 0; i < numDefendDice; i++)
{
    var tempDice2 = Math.floor((Math.random() *6) + 1);
    defendDice[i] = tempDice2;
}

//Testing output results
console.log("Defenders rolled : " + defendDice);



//Compares each value in the attacker array against each value in the defender array to determine winner
for(i = 0; i < attackDice.length; i++)
{
    for(j = 0; j < defendDice.length; j++)
    {
        if(attackDice[i] > defendDice[j])
        {
            //Console test output
            console.log(attackDice[i] + " beats " + defendDice[j]);
        }
        else if(attackDice[i] < defendDice[j])
        {
            //Console test output
            console.log(attackDice[i] + " loses to " + defendDice[j]);
        }
        else if(attackDice[i] === defendDice[j])
        {
            //Console test output
            console.log("Tie! Defenders win.");
        }
    }
}
