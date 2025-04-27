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
        b: "2,009 km<sup>2</sup> / 775 miles<sup>2</sup>",
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
        c: "He designed the city’s first urban plan",
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
        d: "It softens the tone or adds emphasis",
        c: "It marks formal speech",
        b: "It signals disagreement",
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
        b: "A guardian spirit",
        a: "A ghost or malevolent spirit",
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
        b: "Major League Football (MLF)",
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
        text: "What does the Singlish term 'kiasu,' often heard in Singapore, mean in everyday conversations?",
        a: "Being overly generous",
        d: "Fear of missing out or overly competitive",
        b: "Feeling relaxed and carefree",
        c: "A feeling of good humour or self-amusement",
        answer: "b",
        labels: [
            "tourist",
            "culture",
            "language"
        ]
    },
    {
        id: 17,
        text: "The Marina Bay Sands set a number of world records after its opening in 2010. Which of the following was not considered a world record at its time of opening?",
        a: "The world’s longest elevated outdoor pool",
        b: "The world’s longest public cantilever",
        c: "The world’s largest open-cieling/atrium casino",
        d: "The world's largest reclaimed land foundation",
        answer: "d",
        labels: [
            "tourist",
            "engineering",
            "places"
        ]
    },
    {
        id: 18,
        text: "With large scale dreding, seawealls and sand, Singapore is known for reclaiming land from the sea, atop which sit many iconic landmarks like Marina Bay Sands. Approximately how much land has Singapore reclaimed in total?",
        a: "30 km<sup>2</sup>",
        b: "130 km<sup>2</sup>",
        c: "230 km<sup>2</sup>",
        d: "630 km<sup>2</sup>",
        answer: "b",
        labels: [
            "tourist",
            "history",
            "engineering"
        ]
    }            

]
