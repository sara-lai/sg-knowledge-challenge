const localQs = [
    {
        id: 1,
        text: "A public memorial was attended by over 4,000 Singaporeans for the local legend displayed above. Who is this?",
        a: "Ah Meng",
        b: "Alma Alma",
        c: "Annuar",
        d: "Puan",
        answer: 'a',
        labels: [
            'animals', 'locals'
        ],
        type: 'image-based',
        imageName: 'landing2.jpg',
    },    
    {
        id: 2,
        text: "Singaporeans are internationally recognised for their maths skill. A dataset has a mean of 20 and a standard deviation of 5. What is the z-score for a value of 25?",
        a: "0",
        b: "1",
        c: "1.5",
        d: "2",
        answer: 'b',
        labels: [
            'math', 'locals'
        ],
    }, 
    {
        id: 3,
        text: "Which of the following is not a variety of Durian?",
        a: "Red Prawn",
        b: "Capri",
        c: "Black Thorn",
        d: "Gold Pearl",
        answer: 'd',
        labels: [
            'durian', 'locals'
        ],
    },  
    {
        id: 4,
        text: "Singapore is a high musicality country, with a high portion of the population who've studied music or play instruments. Music is also a compulsory subject in primary school. What is the dominant chord in the key of G major?",
        a: "A major",
        b: "B major",
        c: "C major",
        d: "D major",
        answer: 'd',
        labels: [
            'music', 'locals'
        ],
    },   
    {
        id: 5,
        text: "The Singapore Premier League is home to many football legends. This player holds the national record for most international caps (146) for Singapore, and he scored the oldest goal in SPL history at the age 44 for Tanjong Pagar United. Who is he?",
        a: "Fandi Ahmad",
        b: "V. Sundramoorthy",
        c: "Daniel Bennett",
        d: "Nazri Nasir",
        answer: 'c',
        labels: [
            'sports', 'locals'
        ],
    },   
    {
        id: 6,
        text: "Wet bulb temperature (WBT) is a measurement that combines temperature with humidity, and is used in National Service. It indicates to what extent the human body can cool itself through sweating. What WBT is widely considered life-threatening?",
        a: "32.5 C",
        b: "35 C",
        c: "37.5 C",
        d: "40 C",
        answer: 'b',
        labels: [
            'heat', 'locals'
        ],
    }, 
    {
        id: 7,
        text: "Hokkien is Singapore's main Chinese dialect, with 5–7 tones, unique consonants and a flexible grammar. If you hear 'Buay Sai' in a kopitiam, what is the most likely context?",
        a: "Someone loves their food",
        b: "Someone's friend is stereotypically late",
        c: "Someone cannot finish their dish",
        d: "Someone is getting ready to leave",
        answer: 'c',
        labels: [
            'heat', 'locals'
        ],
    },   
    {
        id: 8,
        text: "While skiing is possible in Singapore (Jurong East, indoors), Singapore is not particularly known for its cold weather... Or is it? What is the coldest day on record in Singapore?",
        a: "14.4° C",
        b: "15.9° C",
        c: "16.8° C",        
        d: "19.4° C",
        answer: 'd',
        labels: [
            'heat', 'locals'
        ],
    },                                            
    {
        id: 9,
        text: "Lee Kuan Yew was called what nickname by his family and close friends?",
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
        id: 10,
        text: "This esteemed resident was born in Singapore in 1990 where he lived his life out to old age, the first of his type to be born in the tropics. What is his name?",
        a: "Knut",
        b: "Flocke",
        c: "Inuka",
        d: "Tan",
        answer: 'c',
        labels: [
            'animals', 'locals'
        ],
        type: 'image-based',
        imageName: 'landing5.jpg',
    }, 
    {
        id: 11,
        text: "Singapore's most famous olympic gold medalist is an athlete by the name of:",
        a: "Joseph Schooling",
        b: "Soh Rui Yong",
        c: "Loh Kean Yew",
        d: "Daniel Bennett",        
        answer: 'a',
        labels: [
            'sports', 'locals'
        ],
    },     
    {
        id: 12,
        text: "Istana Woodneuk is an opulent palace and former Sultan residence, sitting on land that is inside Singapore but technically owned by the State of Johor. If you want to take a tour, there's one twist: ",
        a: "You must apply for a visa to set foot on the land",
        b: "The palace is only open for 30 minutes each day",
        c: "You must find it: the palace is 'lost' with no marked trails",
        d: "The palace is now a P.S. Cafe",        
        answer: 'c',
        labels: [
            'misc', 'locals'
        ],
    },               
    {
        id: 13,
        text: "Which Singlish term, commonly used to describe reserving a seat at a hawker centre, was popularised by locals leaving tissue packets on tables?",
        a: "Chope",
        b: "Sabo",
        c: "Lepak",
        d: "Ai Mai",        
        answer: 'a',
        labels: [
            'singlish', 'locals'
        ],
    }, 
    {
        id: 14,
        text: "Which historical kampong, considered Singapore’s last surviving mainland village, preserves a slice of the nation’s rural past?",
        a: "Kampong Glam",
        b: "Kampong Lorong Buangkok",
        c: "Kampong Amber",
        d: "Kampong Ubi",        
        answer: 'b',
        labels: [
            'kampong', 'locals'
        ],
    },    
    {
        id: 15,
        text: "Which distinctive durian variety is renowned for its striking orange flesh, potent sweetness with a subtle bitter edge, and dark-tipped spikes that give it a fierce reputation at stalls like those in Geylang?",
        a: "Black Thorn",
        b: "Orange Pearl",
        c: "Golden Pearl",
        d: "Black Pearl",        
        answer: 'a',
        labels: [
            'durian', 'locals'
        ],
    },    
    {
        id: 16,
        text: "Which durian variety is celebrated for its pale, almost white flesh, bitter flavor with a watery texture, and an aroma that novices might mistake for spoilage?",
        a: "Red Prawn",
        b: "Capri",
        c: "XO",
        d: "Golden Phoenix",        
        answer: 'd',
        labels: [
            'durian', 'locals'
        ],
    },  
    {  
        id: 17,
        text: "Singapore has a number of unique and extreme slides. Which of the following slides does not actually exist?",
        a: "A slide that takes passengers from the transit area down to their gate at Changi Airport",
        b: "A 16 meter tall slide that overlooks mega vessels in the Singapore strait, found in East Coast park",
        c: "The slide at Marquee at Marina Bay Sands, which takes you 3 stories down to the dance floor",
        d: "The Universal Studios multi-part Sesame Street-themed slide that combines spaghetti with space travel",
        answer: "d",
        labels: [
            "locals",
            "quirky",
        ]
    },   
    {  
        id: 18,
        text: "With a doctorate from Julliard, this Singaporean classical music artist shown above is known for her work with unconventional instruments. Who is she?",
        a: "Margaret Leng Tan",
        b: "Lynnette Seah",
        c: "Vanessa-Mae",
        d: "Stefanie Sun",
        answer: "a",
        labels: [
            "locals",
            "music",
        ],
        type: 'image-based',
        imageName: 'landing34.png',        
    },  
    {  
        id: 19,
        text: "With a Malay film star mother, this famous singer started out as a child actress and went on to release best-selling albums in the 1980s, later coming out of retirement to appear on Singapore Idol. Who is this famous Singaporean singer?",
        a: "Anita Sarawak",
        b: "Amy Mastura",
        c: "Rahimah Rahim",
        d: "Siti",
        answer: "c",
        labels: [
            "locals",
            "pop",
        ],
        type: 'image-based',
        imageName: 'landing81.jpg',        
    },   
    {  
        id: 20,
        text: "What is Fried Rice Paradise?",
        a: "A nickname for the Golden Mile Food Centre",
        b: "A common hawker centre promotional stunt in the 1990s, where loyal patrons received free sides of rice",
        c: "A football chant heard at Warriors FC matches",
        d: "A comedic musical drama about running a restaurant",
        answer: "d",
        labels: [
            "locals",
            "pop",
        ],    
    },    
    {  
        id: 21,
        text: "Singapore sees over 2,400mm of precipitation each year, so Singaporeans are quite knowledgeable about rain.... or are they? Why does it rain (pick the most correct option)?",
        a: "High pressure systems, common in the tropics, pull out droplets from the ocean to form storm clouds",
        b: "Tiny particles like dust and pollen are sites for droplet formation, until they cause cloud breakup",
        c: "Warm air rises and condenses into clouds until the clouds get too heavy and it rains",
        d: "Troposphere streams originating in China push moisture down over South East Asia, especially during monsoon season",
        answer: "c",
        labels: [
            "locals",
            "climate",
        ],    
    },  
    {  
        id: 22,
        text: "The tower featured above holds the world record for the tallest cylindrical building ever constructed, that is, until it gained the record for the tallest building ever voluntarily demolished. What is its name?",
        a: "HSBC Centre",
        b: "AXA Tower",
        c: "Guocco Tower",
        d: "Millennium Tower",
        answer: "b",
        labels: [
            "locals",
            "buildings",
        ],
        type: 'image-based',
        imageName: 'landing30-2.jpg',                  
    },  
    {  
        id: 23,
        text: "There are currently 6 officially recognized Merlion statues found in Singapore. Which of the following is not one of them?",
        a: "The Merlion at Mount Faber",
        b: "The Merlion at 2nd link",
        c: "The Merlion at a car park entrance in Ang Mo Kio",
        d: "The Merlion at Singapore's Tourism Board office",
        answer: "b",
        labels: [
            "locals",
            "buildings",
        ],    
    },  
    {  
        id: 24,
        text: "Nick Leeson is a familiar name in Singapore, once portrayed by Ewan McGregor in a popular film, with a swanky bar in town named for him. Who is he?",
        a: "He's a yatch racing world champion known for his legendary antics",
        b: "He flew a Singapore Airlines 747 to safety after total engine failure due to a nearby volcanic eruption",
        c: "He was a struggling artist who rose to fame, eventually designing Marina Bay Sands",        
        d: "His speculative trades brought down the oldest bank in England",  
        answer: "d",
        labels: [
            "locals",
            "history",
        ],    
    },      
    {  
        id: 25,
        text: "The wealthiest resident of Singapore with quite a significant mansion on Nassim Road is the creator/co-creator of what?",
        a: "Haidilao",
        b: "Dyson",
        c: "Shenzhen Mindray Bio-Medical Electronics",        
        d: "Facebook",  
        answer: "d",
        labels: [
            "locals",
            "people",
        ],    
    },  
    {  
        id: 26,
        text: "This painting is a self-portrait of which Singaporean artist often featured at National Gallery exhibitions?",
        a: "Chng Seok Tin",
        b: "Georgette Chen",
        c: "Anita Magsaysay-Ho",        
        d: "Han Sai Por",  
        answer: "b",
        labels: [
            "locals",
            "people",
        ],    
        type: 'image-based',
        imageName: 'landing21.jpg',            
    },   
    {  
        id: 27,
        text: "Some Singaporeans hit the Johor e-gates to live at upscale, sprawling property developments that are sometimes 10x cheaper per square foot than Singapore. One such development cost $100 billion USD to develop but only houses 1% of the intended 700,000. What is it called?",
        a: "Iskandar Puteri",
        b: "Horizon Hills",
        c: "Forest City",        
        d: "Sunway",  
        answer: "c",
        labels: [
            "locals",
            "malaysia",
        ],           
    },                                                                     
]    







