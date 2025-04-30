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
        text: "Istana Woodneuk is an opulant palace and former Sultan residence, sitting on land that is inside Singapore but technically owned by the State of Johor. If you want to take a tour, there's one twist: ",
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
        text: "Which historical kampong, considered Singapore’s last surviving mainland village, preserves a slice of the nation’s rural past with about 25 houses?",
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
        text: "Which distinctive durian variety, a favorite among aficionados, is renowned for its striking orange flesh, potent sweetness with a subtle bitter edge, and dark-tipped spikes that give it a fierce reputation at stalls like those in Geylang?",
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
        text: "Which durian variety, coveted by Singapore’s enthusiasts, is celebrated for its pale, almost white flesh, bitter flavor with a watery texture, and an aroma that novices may mistaken for spoilage?",
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
        text: "Interestingly, Singapore has a number of unique and extreme slides. Which of the following slides does not actually exist?",
        a: "A slide that takes passengers from the transit area down to their gate at Changi Airport",
        b: "East Coast Park's 16 meter tall slide that overlooks mega vessels in the Singapore strait",
        c: "Famed nightclub Marquee's 3 story slide down to the dance floor",
        d: "Universal Studio's multi-part Sesame Street-themed slide that combines spaghetti with space travel",
        answer: "d",
        labels: [
            "tourist",
            "quirky",
        ]
    },                              
]    







