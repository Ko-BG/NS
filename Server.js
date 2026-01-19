<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>GreenBook OS • Online</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
*{box-sizing:border-box;font-family:Inter,Segoe UI,system-ui;margin:0}
body{background:radial-gradient(circle at top,#00ffcc22,#001814 70%);color:#dffff5;min-height:100vh;}
header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;background:linear-gradient(90deg,#00ffc6,#00c853);box-shadow:0 0 30px #00ffc6aa;}
.logo{font-weight:900;color:#003;font-size:20px;}
.logout{border:none;border-radius:30px;padding:8px 18px;background:black;color:#00ffc6;box-shadow:0 0 12px #00ffc6;cursor:pointer;font-weight:700;transition:.3s;}
.logout:hover{transform:scale(1.08);box-shadow:0 0 25px #00ffc6;}
.profile{font-size:22px}
.page{max-width:440px;margin:80px auto;padding:20px}
.hidden{display:none}
.card{background:rgba(0,255,200,.08);border:1px solid #00ffc644;border-radius:16px;padding:22px;margin-bottom:16px;backdrop-filter:blur(14px);box-shadow:0 0 18px #00ffc622;}
h2{text-align:center;margin-bottom:14px;color:#00ffc6}
input,textarea,select,button{width:100%;padding:12px;margin:8px 0;border-radius:10px;border:none;font-size:15px;}
input,textarea{background:black;color:#00ffc6;border:1px solid #00ffc633}
button{background:linear-gradient(90deg,#00ffc6,#00c853);font-weight:700;color:black;cursor:pointer;}
button.secondary{background:none;border:1px solid #00ffc6;color:#00ffc6;}
.dashboard{max-width:1150px;margin:auto;padding:18px}
.tabs{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:14px;}
.tabs button{background:rgba(0,255,200,.15);color:#00ffc6;border-radius:14px;box-shadow:0 0 12px #00ffc633;transition:.2s;}
.tabs button:hover{transform:translateY(-2px);background:rgba(0,255,200,.35)}
.panel{display:none}
.panel.active{display:block}
canvas{background:black;border-radius:12px;border:1px solid #00ffc6;touch-action:none;}
.feed{padding:6px;border-bottom:1px solid #00ffc622}
.small{font-size:13px;opacity:.8}
</style>
</head>
<body>

<header id="topBar" class="hidden">
<div class="logo">🌿 GreenBook OS</div>
<button class="logout" onclick="logout()">LOGOUT</button>
<div class="profile">👤</div>
</header>

<!-- HOME -->
<div id="home" class="page">
<div class="card">
<h2>Welcome</h2>
<button onclick="openSignup('student')">Student Sign Up</button>
<button onclick="openSignup('teacher')">Teacher Sign Up</button>
<button onclick="openSignup('parent')">Parent Sign Up</button>
<hr>
<button class="secondary" onclick="openLogin('student')">Student Login</button>
<button class="secondary" onclick="openLogin('teacher')">Teacher Login</button>
<button class="secondary" onclick="openLogin('parent')">Parent Login</button>
</div>
</div>

<!-- SIGNUP -->
<div id="signupPage" class="page hidden">
<div class="card">
<h2 id="signupTitle"></h2>
<input id="su_name" placeholder="Full Name">
<input id="su_id" placeholder="Unique ID">
<input id="su_pass" type="password" placeholder="Password">
<button onclick="signup()">Create Account</button>
<button class="secondary" onclick="goHome()">Back</button>
</div>
</div>

<!-- LOGIN -->
<div id="loginPage" class="page hidden">
<div class="card">
<h2 id="loginTitle"></h2>
<input id="li_id" placeholder="ID">
<input id="li_pass" type="password" placeholder="Password">
<button onclick="login()">Login</button>
<button class="secondary" onclick="goHome()">Back</button>
</div>
</div>

<!-- DASHBOARD -->
<div id="dashboard" class="dashboard hidden">

<!-- STUDENT -->
<div id="studentDash" class="hidden">
<h2>🎓 Student Dashboard</h2>
<div class="tabs">
<button onclick="openPanel('s_notes')">Notes</button>
<button onclick="openPanel('s_assign')">Assignments</button>
<button onclick="openPanel('s_exam')">Exams</button>
<button onclick="openPanel('s_feed')">Classroom</button>
<button onclick="openPanel('s_maktaba')">e-Maktaba</button>
<button onclick="openPanel('s_sketch')">Stylus</button>
<button onclick="openPanel('s_influensa')">Influensa</button>
</div>

<div id="s_notes" class="panel active card">
<textarea id="notesArea" placeholder="Write notes..."></textarea>
<button onclick="saveNotes()">💾 Save Notes</button>
<div id="notesFlashcards"></div>
</div>

<div id="s_assign" class="panel card">
<div id="studentAssignments"></div>
<input type="file" id="assignFile" multiple>
<button onclick="submitAssignment()">Submit Assignment</button>
</div>

<div id="s_exam" class="panel card">
<div id="studentExams"></div>
<button onclick="takeExam()">Take Exam</button>
</div>

<div id="s_feed" class="panel card">
<textarea id="chatMsg" placeholder="Class message or group collaboration"></textarea>
<input type="file" id="chatFile" multiple>
<button onclick="sendChat()">Send</button>
<div id="chatBox"></div>
</div>

<div id="s_maktaba" class="panel card">
<p>Wallet: <span id="wallet">100</span> credits</p>
<button onclick="buy()">Buy Digital Resource</button>
<div id="library"></div>
</div>

<div id="s_sketch" class="panel card">
<select id="color"><option>white</option><option>red</option><option>cyan</option></select>
<input type="range" id="size" min="2" max="12" value="4">
<canvas id="canvas" width="520" height="300"></canvas>
<button onclick="clearCanvas()">Clear</button>
<button onclick="saveCanvas()">💾 Save Drawing</button>
</div>

<div id="s_influensa" class="panel card">
<p>Share, Buy or Sell Intellectual Property</p>
<textarea id="ipText" placeholder="Describe your IP"></textarea>
<input type="number" id="ipPrice" placeholder="Price in credits">
<button onclick="postIP()">Post IP</button>
<div id="ipFeed"></div>
</div>

<!-- TEACHER -->
<div id="teacherDash" class="hidden">
<h2>👨‍🏫 Teacher Dashboard</h2>
<div class="tabs">
<button onclick="openPanel('t_assign')">Assignments</button>
<button onclick="openPanel('t_exam')">Exams</button>
<button onclick="openPanel('t_feed')">Classroom</button>
</div>

<div id="t_assign" class="panel active card">
<input id="tAssign" placeholder="Assignment Title">
<button onclick="createAssignment()">Publish</button>
<div id="tAssignFeed"></div>
</div>

<div id="t_exam" class="panel card">
<input id="examTitle" placeholder="Exam Title">
<button onclick="postExam()">Post Exam</button>
<div id="examFeed"></div>
</div>

<div id="t_feed" class="panel card">
<textarea id="teacherMsg" placeholder="Announcement"></textarea>
<button onclick="sendTeacher()">Post</button>
<div id="teacherFeed"></div>
</div>
</div>

<!-- PARENT -->
<div id="parentDash" class="hidden">
<h2>👪 Parent Dashboard</h2>
<div class="card">
<div id="parentResults"></div>
</div>
</div>

</div>

<script>
// --- NAV ---
let currentUser=null,currentRole="";
function hideAll(){home.classList.add("hidden");signupPage.classList.add("hidden");loginPage.classList.add("hidden");dashboard.classList.add("hidden");}
function openSignup(r){hideAll();currentRole=r;signupTitle.innerText="Sign Up as "+r;signupPage.classList.remove("hidden");}
function openLogin(r){hideAll();currentRole=r;loginTitle.innerText="Login as "+r;loginPage.classList.remove("hidden");}
function goHome(){hideAll();home.classList.remove("hidden");topBar.classList.add("hidden");}
function logout(){currentUser=null;goHome();}

// --- DASHBOARD ---
function openDashboard(){
hideAll();dashboard.classList.remove("hidden");topBar.classList.remove("hidden");
studentDash.classList.add("hidden");teacherDash.classList.add("hidden");parentDash.classList.add("hidden");
if(currentUser.role==="student") studentDash.classList.remove("hidden");
if(currentUser.role==="teacher") teacherDash.classList.remove("hidden");
if(currentUser.role==="parent") parentDash.classList.remove("hidden");
renderAll();
}
function openPanel(id){document.querySelectorAll(".panel").forEach(p=>p.classList.remove("active"));document.getElementById(id).classList.add("active");}

// --- AUTH ---
async function signup(){
if(!su_name.value||!su_id.value||!su_pass.value) return alert("Fill all");
let res = await fetch("/api/signup",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
name:su_name.value,id:su_id.value,password:su_pass.value,role:currentRole
})});
let data = await res.json();
if(data.error) return alert(data.error);
alert("Signup success!"); openLogin(currentRole);
}

async function login(){
let res = await fetch("/api/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
id:li_id.value,password:li_pass.value,role:currentRole
})});
let data = await res.json();
if(data.error) return alert(data.error);
currentUser=data.user; openDashboard();
}

// --- NOTES ---
async function saveNotes(){
if(!notesArea.value.trim()) return alert("Nothing to save!");
await fetch("/api/notes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
user:currentUser.name,content:notesArea.value
})});
alert("Notes saved!");
}
async function loadNotes(){
if(currentUser.role==="student"){
let res=await fetch("/api/notes/"+currentUser.name);
let data=await res.json();
notesArea.value=data.content||"";
}
}

// --- ASSIGNMENTS ---
async function renderAssignments(){
let res=await fetch("/api/assignments"); let data=await res.json();
studentAssignments.innerHTML=""; tAssignFeed.innerHTML="";
data.forEach(a=>{studentAssignments.innerHTML+=`<div class="feed">📘 ${a.title}</div>`;
tAssignFeed.innerHTML+=`<div class="feed">📘 ${a.title}</div>`;});
}
async function createAssignment(){
await fetch("/api/assignments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:tAssign.value})});
tAssign.value=""; renderAssignments();
}
async function submitAssignment(){alert("File submission simulated. For real, implement file upload API.");}

// --- EXAMS ---
async function renderExams(){
let res=await fetch("/api/exams"); let data=await res.json();
studentExams.innerHTML=""; examFeed.innerHTML="";
data.forEach(e=>{studentExams.innerHTML+=`<div class="feed">📝 ${e.title}</div>`;});
}
async function postExam(){await fetch("/api/exams",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:examTitle.value})});examTitle.value="";renderExams();}
async function takeExam(){let score=Math.floor(Math.random()*40)+60;
await fetch("/api/submit",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({student:currentUser.name,type:"exam",score})});
alert("Exam submitted — Score "+score+"%");renderParent();}

// --- FEED ---
async function sendChat(){await fetch("/api/feed",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:currentUser.name,text:chatMsg.value,files:[]})});chatMsg.value="";renderFeed();}
async function sendTeacher(){await fetch("/api/feed",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:"Teacher",text:teacherMsg.value,files:[]})});teacherMsg.value="";renderFeed();}
async function renderFeed(){let res=await fetch("/api/feed");let data=await res.json();chatBox.innerHTML="";teacherFeed.innerHTML="";data.forEach(m=>{chatBox.innerHTML+=`<div class="feed">${m.user}: ${m.text}</div>`;teacherFeed.innerHTML+=`<div class="feed">${m.user}: ${m.text}</div>`;});}

// --- PARENT ---
async function renderParent(){let res=await fetch("/api/submissions"); let data=await res.json();
parentResults.innerHTML=""; data.filter(s=>s.type==="exam").forEach(s=>{parentResults.innerHTML+=`<div class="feed">📊 ${s.student} scored ${s.score}%</div>`;});}

// --- WALLET / LIBRARY ---
async function buy(){await fetch("/api/library/buy",{method:"POST"}); renderLibrary();}
async function renderLibrary(){let res=await fetch("/api/library"); let data=await res.json(); library.innerHTML=data.map(r=>`<div class="feed">📚 ${r}</div>`).join("");}

// --- INFLUENSA ---
async function postIP(){if(!ipText.value.trim()) return alert("Describe your IP");
await fetch("/api/ip",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({owner:currentUser.name,desc:ipText.value,price:parseInt(ipPrice.value)||0})});
ipText.value="";ipPrice.value="";renderIP();}
async function renderIP(){let res=await fetch("/api/ip");let data=await res.json();s_influensa.querySelector("#ipFeed").innerHTML=data.map(ip=>`<div class="feed">💡 ${ip.owner}: ${ip.desc} — ${ip.price} credits</div>`).join("");}

// --- RENDER ALL ---
async function renderAll(){await renderAssignments();await renderFeed();await renderExams();await renderParent();await renderLibrary();await renderIP();await loadNotes();}

// --- STYLUS ---
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");ctx.lineCap="round";ctx.lineJoin="round";let drawing=false,lastX=0,lastY=0;
function getPos(e){let r=canvas.getBoundingClientRect();if(e.touches)return{x:e.touches[0].clientX-r.left,y:e.touches[0].clientY-r.top};return{x:e.offsetX,y:e.offsetY};}
function startDraw(e){drawing=true;let p=getPos(e);lastX=p.x;lastY=p.y;}
function draw(e){if(!drawing)return;let p=getPos(e);ctx.strokeStyle=color.value;ctx.lineWidth=size.value;ctx.beginPath();ctx.moveTo(lastX,lastY);ctx.lineTo(p.x,p.y);ctx.stroke();lastX=p.x;lastY=p.y;}
function stopDraw(){drawing=false;}
canvas.addEventListener("mousedown",startDraw);canvas.addEventListener("mousemove",draw);canvas.addEventListener("mouseup",stopDraw);
canvas.addEventListener("touchstart",e=>{startDraw(e);e.preventDefault();});
canvas.addEventListener("touchmove",e=>{draw(e);e.preventDefault();});
canvas.addEventListener("touchend",stopDraw);
function clearCanvas(){ctx.clearRect(0,0,canvas.width,canvas.height);}
function saveCanvas(){let link=document.createElement("a");link.download="drawing.png";link.href=canvas.toDataURL();link.click();alert("Drawing saved as PNG!");}
</script>
</body>
</html>
