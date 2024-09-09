function activateButton(clickedButton) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        if (button === clickedButton) {
            button.id = "active";
        } else if(button.classList.contains("changers")) {
            button.id = "";
        }
    });
}




document.getElementById('laden').addEventListener('click', async function() {
  const button = this;
  button.disabled = true;
  document.getElementById("thema").disabled = true;

  try {
      await asyncFunction();
  } catch (error) {
      console.error(error);
  } finally {
      button.disabled = false;
      document.getElementById("thema").disabled = false;
  }
});

async function asyncFunction() {
    try {
        document.getElementById('history').innerHTML += document.getElementById('answer_md').innerHTML + '<br><br>';
  } catch (error) {
      console.error(error);
  }
    document.getElementById('answer_md').textContent = "Antwort wird generiert..."
    const option = document.getElementById('active').value;
    const topic = document.getElementById('thema').value;
    const response = await fetch(
      `/api/chat?option=${option}&topic=${topic}`
    );
    const data = await response.json();
    document.getElementById('answer_md').textContent = JSON.stringify(
      data.message
    );
    document.getElementById("thema").value = ""
}
