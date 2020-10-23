function loop() {
  g("maxValue").textContent = g("max").value;
}setInterval(loop, 0);

g("method").addEventListener("change", function() {
  if(this.value === "count+" || this.value === "count-") {
    sh("ucount", null);
    sh("randomOptions", "none");
  }else {
    sh("ucount", "none");
    sh("randomOptions", null);
  }
});

g("format").addEventListener("change", function() {
  if(this.value === "4") {
    sh("formatCustom", null);
  }else {
    sh("formatCustom", "none");
  }
});

function sh(id, v) {
  g(id).style.display = v;
}
function g(id) {
  return document.getElementById(id);
}

function run() {
  let username = g("username").value;
  if(username.slice(0,1) !== "@") {
    username = "@" + username;
  }
  let message = g("message").value;
  let count = g("count").value;
  let max = g("max").value;
  let method = g("method").value;
  let format = g("format").value;

  let strtInt = parseInt(g("countStrt").value);
  let minInt = parseInt(g("randomMin").value);
  let maxInt = parseInt(g("randomMax").value) + 1;
  let customStrt = g("formatStrt").value;
  let customEnd = g("formatEnd").value;

  let msg = "";

  for (let x=0;x<count;x++) {
    let n;
    if(method === "count+") {
      n = x + strtInt;
    }else if(method === "count-") {
      n = strtInt  - x;
    }else if(method === "random") {
      n = Math.floor(Math.random() * (maxInt - minInt)) + minInt;
    }
    let f;
    if(format === "0") {
      f = n;
    }else if(format === "1") {
      f = `#${n}`;
    }else if(format === "2") {
      f = `[${n}]`;
    }else if(format === "3") {
      f = `(${n})`;
    }else if(format === "4") {
      f = `${customStrt}${n}${customEnd}`;
    }
    let add = `${username} ${message} ${f} `;
    let tmp = msg + `${username} ${message} ${f} `;
    if(tmp.split(username).join("").length + (23 * (x - 1)) <= max) {
      msg += `${username} ${message} ${f} `;
    }else {
      x = count;
    }
  }
  g("final").innerHTML = msg;
}

function spam(user, message, count, method, maxLength) {
  let prefix = `@${user}`;
  let acSpam = "";
  for (let x=0;x<count;x++) {
    let suffix = x;
    if(method) {
      suffix = Math.floor(Math.random() * 100000);
    }
    if(acSpam.length + (` ${message} [${suffix}]`).length + (23 * x + 1) < maxLength) {
      acSpam += `${prefix} ${message} [${suffix}] `;
    }
  }
  console.log(acSpam);
}
