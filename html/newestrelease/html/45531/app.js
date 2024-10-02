// Function to set cookies
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  
  // Function to check for consent
  function checkConsent() {
    return document.cookie.split(';').some((item) => item.trim().startsWith('consent='));
  }
  
  // Function to log data to a file using PHP
  function logData(ipInfo, deviceInfo) {
    const logData = {
      ip: ipInfo,
      device: deviceInfo,
      timestamp: new Date().toISOString()
    };
  
    fetch('log_data.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(logData)
    }).then(response => {
      if (response.ok) {
        console.log('Data logged successfully');
      } else {
        console.error('Failed to log data');
      }
    }).catch(error => {
      console.error('Error logging data:', error);
    });
  }
  
  // Set cookies for Facebook and Google ad info and log data
  function setupLogging() {
    setCookie('fb_ad_info', 'facebook_ad_data', 7);
    setCookie('google_ad_info', 'google_ad_data', 7);
  
    // Get device info
    const deviceInfo = `
      Browser: ${navigator.userAgent}
      Platform: ${navigator.platform}
    `;
  
    // Display device info on the page
    document.getElementById('device-info').innerText = deviceInfo;
  
    // Fetch IP address using an external API
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        const ipInfo = `IP Address: ${data.ip}`;
        document.getElementById('ip-info').innerText = ipInfo;
        logData(ipInfo, deviceInfo);
      });
  }
  
  // Event listeners for consent buttons
  document.getElementById('allow-cookies').addEventListener('click', () => {
    setCookie('consent', 'true', 365);
    document.getElementById('consent-dialog').style.display = 'none';
    setupLogging();
  });
  
  document.getElementById('deny-cookies').addEventListener('click', () => {
    document.getElementById('consent-dialog').style.display = 'none';
  });
  
  // Check for existing consent
  if (checkConsent()) {
    document.getElementById('consent-dialog').style.display
  }  