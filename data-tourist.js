const touristQs = [
    {
        id: 1,
        text: "What is the name of the famous cocktail reputed to have originated at The Long Bar in Raffles Hotel?",
        a: "The Singapore Sting",
        b: "The Temasek Tequila Tsunami ",
        c: "The Nanyang Negroni",
        d: "The Singapore Sling",
        answer: 'd',
        labels: [
            'tourist', 'culinary'
        ]
    },
    {
        id: 2,
        text: "What is the name of the mythical creature with a lion’s head and a fish’s body, symbolizing Singapore’s origins?",
        a: "Lionfish",
        b: "Gorgonu",
        c: "Wuruk",
        d: "Merlion",
        answer: 'd',
        labels: [
            'tourist', 'folklore', 'culinary'
        ]     
    },
    {
        id: 3,
        text: "Which hawker centre was famously featured in the movie Crazy Rich Asians?",
        a: 'Newton',
        b: 'Maxwell',
        c: 'Golden Mile',
        d: 'Lau Pa Sat',
        answer: 'a',
        labels: [
            'tourist', 'folklore', 'culinary'
        ]         
    }, 
    {
        id: 4,
        text: "Which resort island, accessible by cable car or monorail, is home to attractions like Universal Studios and a sprawling aquarium?",
        a: "Jurong Island",
        b: "Coney Island",
        c: "Sentosa Island",
        d: "Singapore Island",
        answer: 'c',
        labels: [
            'tourist', 'folklore', 'culinary'
        ]        
    },  
    {
        id: 5,
        text: "Approximately how many square kilometers/miles is Singapore?",
        a: "10,135 km<sup>2</sup> / 3,912 miles<sup>2</sup>",        
        b: "2,035 km<sup>2</sup> / 775 miles<sup>2</sup>",
        c: "735 km<sup>2</sup> / 284 miles<sup>2</sup>",
        d: "155 km<sup>2</sup> / 60 miles<sup>2</sup>",
        answer: 'c',
        labels: [
            'tourist', 'folklore', 'culinary'
        ]        
    },    
    {
        id: 6,
        text: "What iconic Singapore dish, often served with cucumber and peanut sauce, was named after a street that no longer exists?",
        a: "Hainanese Chicken Rice",
        b: "Satay",
        c: "Laksa",
        d: "Chilli Crab",
        answer: "b",
        labels: [
            "tourist",
            "culinary",
            "history"
        ]
    },  
    {
        id: 7,
        text: "Which museum, shaped like a lotus flower, showcases Singapore’s history and cultural heritage?",
        b: "National Museum of Singapore",
        a: "ArtScience Museum",
        c: "Peranakan Museum",
        d: "Asian Civilisations Museum",
        answer: "a",
        labels: [
            "tourist",
            "culture",
            "places"
        ]
    },     
    {
        id: 8,
        text: "What spicy, coconut-based noodle soup is a staple of Peranakan cuisine and a must-try in Singapore?",
        a: "Bak Kut Teh",
        b: "Laksa",
        c: "Rojak",
        d: "Hokkien Mee",
        answer: "b",
        labels: [
            "tourist",
            "culinary",
            "culture"
        ]
    },
    {
        id: 9,
        text: "Which historic fort, built in the 19th century, now hosts concerts and events on its scenic hilltop?",
        a: "Fort Siloso",
        d: "Fort Canning",
        c: "Fort Pasir Panjang",
        b: "Fort Faber",
        answer: "d",
        labels: [
            "tourist",
            "history",
            "places"
        ]
    },    
    {
        id: 10,
        text: "What is the name of the vibrant street in Kampong Glam, famous for its Middle Eastern cafes and textile shops?",
        a: "Haji Lane",
        b: "Bugis Street",
        c: "Orchard Road",
        d: "Clarke Quay",
        answer: "a",
        labels: [
            "tourist",
            "culture",
            "places"
        ]
    },
    {
        id: 11,
        text: "Which annual event transforms Singapore’s skyline with a dazzling display of fireworks and performances over Marina Bay?",
        a: "Singapore Grand Prix",
        b: "National Day Parade",
        c: "4th of July",
        d: "Deepavali Festival",
        answer: "b",
        labels: [
            "tourist",
            "culture",
            "events"
        ]
    },
    {
        id: 12,
        text: "What key role did Sir Stamford Raffles play in Singapore’s history, leading to its establishment as a British trading port in 1819?",
        a: "He was the first governor of Singapore",
        b: "He signed a treaty with the local rulers to establish a trading post",
        c: "He designed the city’s first urban plan, overseeing initial construction",
        d: "He discovered the island while sailing",
        answer: "b",
        labels: [
            "tourist",
            "history",
            "people"
        ]
    },   
    {
        id: 13,
        text: "In Singlish, Singapore’s unique colloquial English, what is the primary function of the particle 'lah' when added to the end of a sentence?",
        a: "It indicates a question",
        b: "It signals disagreement",
        c: "It marks formal speech",
        d: "It softens the tone or adds emphasis",        
        answer: "d",
        labels: [
            "tourist",
            "culture",
            "language"
        ]
    },    
    {
        id: 14,
        text: "In Singapore, the Malay word 'hantu' is commonly used in local folklore to refer to what supernatural entity?",
        a: "A guardian spirit",
        b: "A ghost or malevolent spirit",
        c: "A haunted dwelling",
        d: "A protective deity",
        answer: "b",
        labels: [
            "tourist",
            "folklore",
            "culture"
        ]
    },
    {
        id: 15,
        text: "What is the name of Singapore’s top-tier professional football league, known for featuring clubs like Lion City Sailors and Tampines Rovers?",
        a: "Singapore Football League",
        b: "League of Lions",
        c: "Singapore Premier League",
        d: "FAS National League",
        answer: "c",
        labels: [
            "tourist",
            "sports",
            "culture"
        ]
    },
    {
        id: 16,
        text: "What does the Singlish term 'kiasu' mean in everyday conversations?",
        a: "Being overly generous",
        b: "Fear of missing out or overly competitive",
        c: "Feeling relaxed and carefree",
        d: "A feeling of self-amusement or whimsicalness",
        answer: "b",
        labels: [
            "tourist",
            "culture",
            "language"
        ]
    },
    {
        id: 17,
        text: "Marina Bay Sands has set a number of world records after its opening in 2010. Which of the following is not considered a current or past world record?",
        a: "The world's largest reclaimed land foundation",
        b: "The world’s longest public cantilever",
        c: "The world’s largest gathering of people dressed as ghosts",
        d: "The world’s longest elevated, outdoor pool",        
        answer: "a",
        labels: [
            "tourist",
            "engineering",
            "places"
        ]
    },
    {
        id: 18,
        text: "With large scale dredging, seawalls and sand, Singapore is known for reclaiming land from the sea, which rests beneath iconic landmarks like Marina Bay Sands. Approximately how much land has Singapore reclaimed in total?",
        a: "30 km<sup>2</sup>",
        b: "130 km<sup>2</sup>",
        c: "330 km<sup>2</sup>",
        d: "730 km<sup>2</sup>",
        answer: "b",
        labels: [
            "tourist",
            "history",
            "engineering"
        ]
    },   
    {
        id: 19,
        text: "What is the commonly heard Singlish term that is an approximate synonym for 'Yes'?",
        a: "Ja",
        b: "Done",
        c: "Will",
        d: "Can",        
        answer: "d",
        labels: [
            "tourist",
            "culture",
            "language"
        ]
    },     
    {
        id: 20,
        text: "While Singapore Airlines is well-known and often ranks as the world's best, they also launched a zippy budget airline soaring across Asia’s skies on the cheap! What's its name?",
        a: "AirAsia",
        b: "Lion Air",
        c: "Scoot",
        d: "Jetstar",
        answer: "c",
        labels: [
            "tourist",
            "travel",
            "culture"
        ]
    },
    {
        id: 21,
        text: "At 164 meters, what is the name of the tallest natural elevation point in Singapore?",
        a: "Mount Faber",
        b: "Mount Emily",
        c: "Bukit Timah Hill",
        d: "Joo Chiat Peak ('The Crag')",
        answer: "c",
        labels: [
            "tourist",
            "travel",
            "culture"
        ]
    },
    {
        id: 22,
        text: "When the Philippines’ Mount Pinatubo erupted in 1991, a layer of ash covered ground and cars across Singapore. Approximately how far away is the nearest known active volcano from Singapore?",
        a: "30 km",
        b: "130 km",
        c: "430 km",
        d: "1,300 km",
        answer: "c",
        labels: [
            "tourist",
            "travel",
            "culture"
        ]
    },
    {
        id: 23,
        text: "Lee Kuan Yew, Singapore’s founding father, was called what nickname by his family and close friends?",
        a: "Richard",
        b: "Harry",
        c: "Oliver",
        d: "Charlie",
        answer: "b",
        labels: [
            "tourist",
            "history",
            "people"
        ]
    },  
    {
        id: 24,
        text: "The Woodlands and Tuas checkpoints, the so called first and second 'links', connect Malysia and Singapore. Approximately how many people make the land crossing each day?",
        a: "60,000",
        b: "100,000",
        c: "270,000",
        d: "450,000",
        answer: "d",
        labels: [
            "tourist",
            "malaysia"
        ]
    },
    {
        id: 25,
        text: "Lee Kuan Yew is Singapore's founding Prime Minister who transformed the nation into a global powerhouse. In which year did this visionary leader pass away?",
        a: "2015",
        b: "2005",
        c: "1995",
        d: "1985",
        answer: "a",
        labels: [
            "tourist",
            "LKY"
        ]
    },
    {
        id: 26,
        text: "A certificate of entitlement (COE) is required to own a vehicle in Singapore, valid for 10 years upon purchase. What is the approximate cost of a COE for a small car?",
        a: "$2,500 SGD ($2,000 USD)",
        b: "$5,000 SGD ($4,000 USD",
        c: "$25,000 SGD ($19,000 USD)",
        d: "$100,000 SGD ($75,000 USD)",
        answer: "d",
        labels: [
            "tourist",
            "transport"
        ]
    },
    {
        id: 27,
        text: "In which year did Singapore became an independent nation?",
        a: "1945",
        b: "1955",
        c: "1965",
        d: "1975",
        answer: "c",
        labels: [
            "tourist",
            "transport"
        ]
    },
    {
        id: 28,
        text: "Singapore’s tropical climate features distinct monsoon and dry seasons, with the Northeast Monsoon bringing the heaviest rainfall. Which months are the rainiest months in Singapore?",
        a: "May to July",
        b: "August to October",
        c: "December to February",
        d: "March to April",
        answer: "c",
        labels: [
            "tourist",
            "climate"
        ]
    },   
    {
        id: 29,
        text: "The Tuas Mega Port, under construction, is set to be world's largest container port with a capacity of 65 million TEU. But how does Singapore currently rank globally in container port size/handled volume?",
        a: "10th largest",
        b: "5th largest",
        c: "2nd largest",
        d: "the largest port in the world",
        answer: "c",
        labels: [
            "tourist",
            "economy",
            "infrastructure"
        ]
    },
    {
        id: 30,
        text: "The HSBC Rain Vortex at Jewel Changi Airport, the world’s tallest indoor waterfall, required clever engineering to keep visitors dry. What did they use to solve this problem?",
        a: "A vast array of hidden air jets",
        b: "A unique form of water-repellent glass panels",
        c: "A laser-guided droplet deflection system",
        d: "Cold air blasts to condense the mist within a given radius",
        answer: "a",
        labels: [
            "tourist",
            "changi",
        ]
    },  
    {
        id: 31,
        text: "Singapore’s large and vibrant Tamil community has long shaped the city’s culture. Which iconic Tamil-founded landmark, built in 1827, is the oldest Hindu temple in Singapore and a must-visit during Deepavali?",
        a: "Sri Veeramakaliamman Temple",
        b: "Sri Mariamman Temple",
        c: "Sri Senpaga Vinayagar Temple",
        d: "Sri Thandayuthapani Temple  ",
        answer: "b",
        labels: [
            "tourist",
            "culture",
        ]
    },      



    
    



]



