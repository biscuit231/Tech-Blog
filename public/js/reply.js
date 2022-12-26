
const replyFormHandler = async (event) => {
    event.preventDefault();

    const reply_body = document.querySelector('#reply').value.trim();
    // const userId = session.user_id
    if (reply_body) {
        console.log(reply_body);
        const response = await fetch('/api/replys/create',{
        method: 'POST',
        body: JSON.stringify({ reply_body }),
        headers: { 'Content-Type': 'application/json' }
    });

        if (response.ok) {
            console.log("res okay");
            document.location.reload();
        
        } else {
            alert(response.statusText);
        }
    }
};


document
.querySelector('.reply')
.addEventListener('submit', replyFormHandler);



