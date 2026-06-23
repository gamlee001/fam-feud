// Questions seeded from the "Survey Says" PPTX deck.
// Each session has a simple label ("Test Session", "Session 1", ...) and a list
// of questions. Each question has the prompt text and 4 ranked answers with points.

const sessions = [
  {
    id: "test",
    label: "Test Session",
    questions: [
      {
        text: "What's the most common reason people relocate from Lagos?",
        answers: [
          { text: "Cost of living", points: 6 },
          { text: "Traffic", points: 4 },
          { text: "Job transfer", points: 3 },
          { text: "Family reasons", points: 2 },
        ],
      },
      {
        text: "Most frequently used mobile app?",
        answers: [
          { text: "WhatsApp", points: 7 },
          { text: "Instagram", points: 3 },
          { text: "TikTok", points: 3 },
          { text: "Twitter (X)", points: 2 },
        ],
      },
      {
        text: "What's the most popular way to commute in Abuja?",
        answers: [
          { text: "Bolt / Taxi", points: 5 },
          { text: "Personal car", points: 4 },
          { text: "Keke Napep", points: 3 },
          { text: "Bus", points: 3 },
        ],
      },
      {
        text: "Which street snack is most loved in Lagos?",
        answers: [
          { text: "Gala", points: 6 },
          { text: "Puff-puff", points: 4 },
          { text: "Boli (roasted plantain)", points: 3 },
          { text: "Akara", points: 2 },
        ],
      },
      {
        text: "What's the first thing people check when they wake up?",
        answers: [
          { text: "WhatsApp / TikTok / socials", points: 7 },
          { text: "Bath", points: 4 },
          { text: "Pray", points: 3 },
          { text: "Brush", points: 1 },
        ],
      },
    ],
  },
  {
    id: "s1",
    label: "Session 1",
    questions: [
      {
        text: "What's the go-to activity on public holidays?",
        answers: [
          { text: "Hang out with friends", points: 6 },
          { text: "Sleep", points: 5 },
          { text: "Travel to hometown", points: 3 },
          { text: "Attend religious event", points: 1 },
        ],
      },
      {
        text: "Most stressful part of planning a wedding?",
        answers: [
          { text: "Family expectations", points: 6 },
          { text: "Feeding guests", points: 4 },
          { text: "Aso Ebi costs", points: 3 },
          { text: "Venue search", points: 2 },
        ],
      },
      {
        text: "A popular slang or meme used most often in conversations?",
        answers: [
          { text: "Yakubu Manage", points: 6 },
          { text: "Wahala", points: 4 },
          { text: "E choke", points: 3 },
          { text: "Shege", points: 2 },
        ],
      },
      {
        text: "Top city for a vacation?",
        answers: [
          { text: "Calabar", points: 6 },
          { text: "Lagos", points: 4 },
          { text: "Abuja", points: 3 },
          { text: "Jos", points: 2 },
        ],
      },
      {
        text: "Most common reason people borrow money before payday?",
        answers: [
          { text: "Emergency bills", points: 6 },
          { text: "Transport fare", points: 4 },
          { text: "Food", points: 3 },
          { text: "Airtime / data", points: 2 },
        ],
      },
      {
        text: "Which TV show do people binge-watch the most?",
        answers: [
          { text: "Big Brother Naija", points: 6 },
          { text: "Jenifa's Diary", points: 4 },
          { text: "The Johnsons", points: 3 },
          { text: "Africa Magic dramas", points: 2 },
        ],
      },
      {
        text: "What's the most popular hangout spot in Lagos?",
        answers: [
          { text: "Beach", points: 6 },
          { text: "Lounge / bar", points: 4 },
          { text: "Mall", points: 3 },
          { text: "Cinema", points: 2 },
        ],
      },
      {
        text: "Which football club has the most loyal fans?",
        answers: [
          { text: "Arsenal", points: 6 },
          { text: "Chelsea", points: 4 },
          { text: "Man City", points: 3 },
          { text: "Manchester United", points: 2 },
        ],
      },
      {
        text: "What's the most common reason people miss morning meetings?",
        answers: [
          { text: "Traffic", points: 7 },
          { text: "Oversleeping", points: 4 },
          { text: "No electricity", points: 2 },
          { text: "Forgot", points: 2 },
        ],
      },
      {
        text: "What's the most common reason people switch jobs?",
        answers: [
          { text: "Better pay", points: 6 },
          { text: "Toxic work environment", points: 4 },
          { text: "Career growth", points: 3 },
          { text: "Relocation", points: 2 },
        ],
      },
    ],
  },
  {
    id: "s2",
    label: "Session 2",
    questions: [
      {
        text: "Which state is known for the best food?",
        answers: [
          { text: "Calabar (Cross River)", points: 6 },
          { text: "Delta", points: 4 },
          { text: "Lagos", points: 3 },
          { text: "Enugu", points: 2 },
        ],
      },
      {
        text: "What's the most common reason people go to the gym?",
        answers: [
          { text: "Weight loss", points: 6 },
          { text: "Fitness", points: 4 },
          { text: "Socializing", points: 3 },
          { text: "Stress relief", points: 2 },
        ],
      },
      {
        text: "What's the most popular way to spend New Year's Eve?",
        answers: [
          { text: "Church crossover service", points: 7 },
          { text: "House party", points: 4 },
          { text: "Watching fireworks", points: 3 },
          { text: "Sleeping early", points: 1 },
        ],
      },
      {
        text: "Most popular way to pass time during long traffic?",
        answers: [
          { text: "Listening to music", points: 6 },
          { text: "Scrolling social media", points: 4 },
          { text: "Sleeping", points: 3 },
          { text: "Complaining", points: 2 },
        ],
      },
      {
        text: "Which dish is best for impressing guests?",
        answers: [
          { text: "Jollof rice", points: 6 },
          { text: "Pounded yam and egusi", points: 4 },
          { text: "Fried rice", points: 3 },
          { text: "Afang soup", points: 2 },
        ],
      },
      {
        text: "Most popular way to spend salary on payday?",
        answers: [
          { text: "Food", points: 6 },
          { text: "Bills", points: 4 },
          { text: "Shopping", points: 3 },
          { text: "Entertainment", points: 2 },
        ],
      },
      {
        text: "Popular drink served at parties?",
        answers: [
          { text: "Malt", points: 5 },
          { text: "Chapman", points: 4 },
          { text: "Soft drinks", points: 3 },
          { text: "Palm wine", points: 3 },
        ],
      },
      {
        text: "Which dish is best for a hangover?",
        answers: [
          { text: "Pepper soup", points: 6 },
          { text: "Jollof rice", points: 4 },
          { text: "Indomie noodles", points: 3 },
          { text: "Akamu and akara", points: 2 },
        ],
      },
      {
        text: "What type of meat is most loved at BBQs?",
        answers: [
          { text: "Suya (beef)", points: 6 },
          { text: "Chicken", points: 4 },
          { text: "Ram / goat", points: 3 },
          { text: "Fish", points: 2 },
        ],
      },
      {
        text: "What's the most popular birthday celebration style?",
        answers: [
          { text: "House party", points: 6 },
          { text: "Dinner at a restaurant", points: 4 },
          { text: "Club outing", points: 3 },
          { text: "Quiet day at home", points: 2 },
        ],
      },
    ],
  },
  {
    id: "s3",
    label: "Session 3",
    questions: [
      {
        text: "What's the most popular side hustle for young people?",
        answers: [
          { text: "Online business / reselling", points: 6 },
          { text: "Freelancing", points: 4 },
          { text: "Betting / trading", points: 3 },
          { text: "Content creation", points: 2 },
        ],
      },
      {
        text: "What do people complain about most?",
        answers: [
          { text: "Electricity (NEPA / PHCN)", points: 7 },
          { text: "Fuel prices", points: 4 },
          { text: "Bad roads", points: 2 },
          { text: "Network issues", points: 2 },
        ],
      },
      {
        text: "What's the most trusted payment method for online shopping?",
        answers: [
          { text: "Transfer (bank)", points: 6 },
          { text: "Pay on delivery", points: 5 },
          { text: "Card payment", points: 3 },
          { text: "USSD", points: 1 },
        ],
      },
      {
        text: "What's the biggest expense for a university student?",
        answers: [
          { text: "Feeding", points: 6 },
          { text: "School fees", points: 4 },
          { text: "Accommodation", points: 3 },
          { text: "Data / airtime", points: 2 },
        ],
      },
      {
        text: "Which bank app do people use the most?",
        answers: [
          { text: "Opay", points: 6 },
          { text: "GTBank (GTWorld)", points: 4 },
          { text: "Access (Access More)", points: 3 },
          { text: "Kuda", points: 2 },
        ],
      },
      {
        text: "What's the first thing people do when salary hits?",
        answers: [
          { text: "Pay bills / debts", points: 6 },
          { text: "Stock up on food", points: 4 },
          { text: "Treat themselves", points: 3 },
          { text: "Send money to family", points: 2 },
        ],
      },
      {
        text: "What's the most common 'flex' on social media?",
        answers: [
          { text: "New phone / gadget", points: 6 },
          { text: "Travel / vacation pics", points: 4 },
          { text: "Car", points: 3 },
          { text: "Designer clothes", points: 2 },
        ],
      },
      {
        text: "What keeps people up at night?",
        answers: [
          { text: "Thinking about money", points: 7 },
          { text: "Phone / social media", points: 4 },
          { text: "Mosquitoes", points: 3 },
          { text: "Heat (no light)", points: 1 },
        ],
      },
      {
        text: "Most common excuse for not picking up phone calls?",
        answers: [
          { text: "Phone was on silent", points: 6 },
          { text: "Didn't see it", points: 4 },
          { text: "Battery was dead", points: 3 },
          { text: "Was in a meeting", points: 2 },
        ],
      },
      {
        text: "What's the most common reason people skip breakfast?",
        answers: [
          { text: "Running late", points: 6 },
          { text: "Not hungry", points: 4 },
          { text: "No food at home", points: 3 },
          { text: "Fasting", points: 2 },
        ],
      },
    ],
  },
  {
    id: "s4",
    label: "Session 4",
    questions: [
      {
        text: "What's the most common lie people tell?",
        answers: [
          { text: "I'm on my way", points: 7 },
          { text: "I'll pay you back", points: 4 },
          { text: "I'm fine", points: 3 },
          { text: "Let me check and get back to you", points: 1 },
        ],
      },
      {
        text: "Most annoying question from relatives during holidays?",
        answers: [
          { text: "When are you getting married?", points: 7 },
          { text: "Where is your partner?", points: 4 },
          { text: "How much do you earn?", points: 2 },
          { text: "When are you having children?", points: 2 },
        ],
      },
      {
        text: "What do mothers threaten their kids with most?",
        answers: [
          { text: "Slippers / cane", points: 6 },
          { text: "Sending you to the village", points: 4 },
          { text: "Reporting to your father", points: 3 },
          { text: "No food tonight", points: 2 },
        ],
      },
      {
        text: "Most common cause of arguments among couples?",
        answers: [
          { text: "Money", points: 6 },
          { text: "Jealousy / trust issues", points: 4 },
          { text: "In-laws", points: 3 },
          { text: "Phone / social media", points: 2 },
        ],
      },
      {
        text: "What's the biggest red flag on a first date?",
        answers: [
          { text: "Being rude to waiters", points: 6 },
          { text: "Always on their phone", points: 4 },
          { text: "Talking about their ex", points: 3 },
          { text: "Not offering to pay", points: 2 },
        ],
      },
      {
        text: "What gift do people bring when visiting someone's house?",
        answers: [
          { text: "Drinks / wine", points: 6 },
          { text: "Food / snacks", points: 4 },
          { text: "Nothing (just show up)", points: 3 },
          { text: "Fruits", points: 2 },
        ],
      },
      {
        text: "What do parents brag about most?",
        answers: [
          { text: "Their child's career / education", points: 7 },
          { text: "Building a house", points: 4 },
          { text: "Going to church", points: 2 },
          { text: "Their child's wedding", points: 2 },
        ],
      },
      {
        text: "What's the most annoying thing neighbours do?",
        answers: [
          { text: "Playing loud music late at night", points: 6 },
          { text: "Using your electricity / water", points: 4 },
          { text: "Parking in your spot", points: 3 },
          { text: "Gossipping", points: 2 },
        ],
      },
      {
        text: "What makes a wedding truly unforgettable?",
        answers: [
          { text: "Spraying money on the dance floor", points: 6 },
          { text: "Good food and drinks", points: 4 },
          { text: "Live band / DJ", points: 3 },
          { text: "Matching Aso Ebi", points: 2 },
        ],
      },
      {
        text: "What phrase does every father say?",
        answers: [
          { text: "When I was your age...", points: 6 },
          { text: "It's my house, my rules", points: 4 },
          { text: "Go and ask your mother", points: 3 },
          { text: "Do you think money grows on trees?", points: 2 },
        ],
      },
    ],
  },
  {
    id: "s5",
    label: "Session 5",
    questions: [
      {
        text: "What do people argue about most on Twitter (X)?",
        answers: [
          { text: "Jollof rice (Nigeria vs Ghana)", points: 6 },
          { text: "Football", points: 4 },
          { text: "Politics", points: 3 },
          { text: "Relationship advice", points: 2 },
        ],
      },
      {
        text: "What's the most common ringtone vibe?",
        answers: [
          { text: "Latest Afrobeats hit", points: 6 },
          { text: "Default phone ringtone", points: 4 },
          { text: "Vibration only", points: 3 },
          { text: "Gospel song", points: 2 },
        ],
      },
      {
        text: "Which music genre is most played at parties?",
        answers: [
          { text: "Afrobeats", points: 7 },
          { text: "Amapiano", points: 4 },
          { text: "Fuji / Juju", points: 2 },
          { text: "Highlife", points: 2 },
        ],
      },
      {
        text: "What's the most common profile picture on WhatsApp?",
        answers: [
          { text: "Selfie", points: 6 },
          { text: "Professional photo", points: 4 },
          { text: "Car / travel photo", points: 3 },
          { text: "No picture at all", points: 2 },
        ],
      },
      {
        text: "What is the most Googled thing?",
        answers: [
          { text: "Football scores", points: 6 },
          { text: "How to make money online", points: 4 },
          { text: "Celebrity gist", points: 3 },
          { text: "Visa / immigration info", points: 2 },
        ],
      },
      {
        text: "What's the most common power bank brand people carry?",
        answers: [
          { text: "Oraimo", points: 7 },
          { text: "New Age", points: 4 },
          { text: "Anker", points: 3 },
          { text: "Samsung", points: 1 },
        ],
      },
      {
        text: "What's the most used emoji?",
        answers: [
          { text: "Crying laughing face", points: 7 },
          { text: "Rolling on floor laughing", points: 4 },
          { text: "Heart", points: 2 },
          { text: "Fire", points: 2 },
        ],
      },
      {
        text: "Most common excuse for a slow reply to messages?",
        answers: [
          { text: "I didn't see it", points: 6 },
          { text: "No data", points: 4 },
          { text: "I was busy", points: 3 },
          { text: "Phone was charging", points: 2 },
        ],
      },
      {
        text: "What type of content goes viral fastest?",
        answers: [
          { text: "Funny skits / memes", points: 7 },
          { text: "Celeb gossip / drama", points: 4 },
          { text: "Political news", points: 2 },
          { text: "Dance challenges", points: 2 },
        ],
      },
      {
        text: "What do people wish they had more of?",
        answers: [
          { text: "Money", points: 7 },
          { text: "Electricity", points: 4 },
          { text: "Time", points: 3 },
          { text: "Good roads", points: 1 },
        ],
      },
    ],
  },
];

module.exports = { sessions };
