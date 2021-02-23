<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Inbox</title>
    <link rel="stylesheet" href="./styling_userinbox.css">
</head>
<body>
    
    <section class="pageHeader">

        <div class="alert">
            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
            <strong>Info</strong> New games are added to the store. Detail....
        </div>

        <h1>Game For You</h1>
        
        <a href="#" class="notification">
            <span>Inbox</span>
            <span class="badge">2</span>
        </a>
        </section>
    
    <section class="inbox">
        <div class="tab">
            
            <button class="tablinks" onclick="openMail(event, 'mail1')" id="defaultOpen">
                <strong>Game Update</strong>
                <br>
                <p>Ten new games has added to the store...</p>
            </button>
            <button class="tablinks" onclick="openMail(event, 'mail2')">
                <strong>User Inbox Maintenance</strong>
                <br>
                <p>Although the forum will remain available...</p>
            </button>
            
        </div>
          
        <div id="mail1" class="tabcontent">
            <br>
            <h3>Game Update</h3>
            <br>
            <pre>
                Good morning,

                The following are games releasing this March:

                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Voluptatibus debitis vero enim veniam tenetur consequatur, 
                recusandae fugit aliquid officia veritatis quasi, explicabo iusto, 
                aperiam libero ullam obcaecati ducimus ratione nemo?

                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Voluptatibus debitis vero enim veniam tenetur consequatur, 
                recusandae fugit aliquid officia veritatis quasi, explicabo iusto, 
                aperiam libero ullam obcaecati ducimus ratione nemo?


                                                                    -- Game For You

            </pre>
        </div>
          
        <div id="mail2" class="tabcontent">
            <br>
            <h3>User Inbox Maintenance</h3>
            <br>
            <pre>
                User inbox will be temporarily unavailable... 

                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Voluptatibus debitis vero enim veniam tenetur consequatur, 
                recusandae fugit aliquid officia veritatis quasi, explicabo iusto, 
                aperiam libero ullam obcaecati ducimus ratione nemo?

                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                Voluptatibus debitis vero enim veniam tenetur consequatur, 
                recusandae fugit aliquid officia veritatis quasi, explicabo iusto, 
                aperiam libero ullam obcaecati ducimus ratione nemo?


                                                                    -- Game For You
            </pre>
        </div>
          
    </section>
    <section class="chat">
        <button class="open-button" onclick="openForm()">Contact Support</button>

        <div class="chat-popup" id="myForm">
        <form action="chat.php" class="form-container">
            <h1>Contact Support</h1>

            <label for="msg"><b>Message</b></label>
            <br>
            <!--
            <textarea placeholder="Type message.." name="msg"required></textarea>
            -->
            <p>The following message is received: <?php echo $_POST["msg"];?></p>

            <button type="submit" class="btn">Send</button>
            <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
        </form>
        </div>
    </section>

    <script src="./js_userinbox.js"></script>
</body>
</html>