import sqlite3

connection = sqlite3.connect('database.db')


with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

sqlite_insert_query = """INSERT INTO feelings (f_name) VALUES ('Sad'), ('Angry'), ('worried') """

cur.execute(sqlite_insert_query)
#cur.execute("INSERT INTO feelings (f_name) VALUES (?)",('Angry'))    
#cur.execute("INSERT INTO feelings (f_name) VALUES (?)",('Worried'))    
#cur.execute("INSERT INTO feelings (f_name) VALUES (?)",('Not Sure'))    

            

cur.execute("INSERT INTO posts (title, content, author, label) VALUES (?, ?, ?, ?)",
           ("By 2033, Elon Musk’s Tesla and its AI will be Smarter than Humans", 
            "To understand the new smart watched and other pro devices of recent focus, we should look to Silicon Valley and the quantified movement. \n Apple’s Watch records exercise, tracks our moves throughout the day, checks the amount of time we are stood up and reminds us to get up and move around if we have been sat for too long – let\’s not forget Tim Cooks 'sitting is the new coolness' line.",
            'Vaishali Bhati',
            'Technology')         
            )

cur.execute("INSERT INTO posts (title, content, author, label) VALUES (?, ?, ?, ?)",
            ('Keep Mobile Technologies Safe with Adaptive Protection',
             "To understand the new smart watched and other pro devices of recent focus, we should look to Silicon Valley and the quantified movement.\n Apple’s Watch records exercise, tracks our moves throughout the day, checks the amount of time we are stood up and reminds us to get up and move around if we have been sat for too long – let’s not forget Tim Cooks 'sitting is the new coolness' line.",
             'Vaishali Bhati', 'Mobile Phone')
            )

connection.commit()
connection.close()