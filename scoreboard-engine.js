/* Bracket Forge Scoreboard Studio - pure, dependency-free match controls. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ForgeScore=api;})(globalThis,function(){
'use strict';
const copy=o=>JSON.parse(JSON.stringify(o));
const presets={
 general:{name:'General points',kind:'points',steps:[1,2,5],periods:1,unit:'Round',seconds:0,counter:'',game:'Game'},
 basketball:{name:'Basketball',kind:'points',steps:[1,2,3],periods:4,unit:'Quarter',seconds:480,counter:'Fouls',game:'Game'},
 soccer:{name:'Soccer',kind:'points',steps:[1],periods:2,unit:'Half',seconds:1200,counter:'',game:'Game'},
 wrestling:{name:'Wrestling',kind:'points',steps:[1,2,3,4],periods:3,unit:'Period',seconds:120,counter:'',game:'Bout'},
 volleyball:{name:'Volleyball',kind:'games',steps:[1],periods:1,unit:'Set',seconds:0,counter:'',game:'Set'},
 esports:{name:'Esports series',kind:'games',steps:[1],periods:1,unit:'Game',seconds:0,counter:'',game:'Game'},
 smash:{name:'Smash Bros. series',kind:'games',steps:[1],periods:1,unit:'Game',seconds:0,counter:'',game:'Game'},
 hockey:{name:'Hockey',kind:'points',steps:[1],periods:3,unit:'Period',seconds:720,counter:'Penalties',game:'Game'},
 board:{name:'Board / tabletop',kind:'points',steps:[1,5,10],periods:1,unit:'Round',seconds:0,counter:'',game:'Game'},
 racing:{name:'Timed / low score',kind:'points',steps:[1,5,10],periods:1,unit:'Run',seconds:0,counter:'',game:'Run'},
 custom:{name:'Custom',kind:'points',steps:[1],periods:1,unit:'Round',seconds:0,counter:'',game:'Game'}
};
const integer=(n,min,max)=>Number.isInteger(n)&&n>=min&&n<=max;
const number=(n,min,max)=>typeof n==='number'&&Number.isFinite(n)&&n>=min&&n<=max;
function config(preset='general',changes={}){if(!Object.hasOwn(presets,preset))throw Error('Unknown scoreboard preset.');const {name,...base}=presets[preset];const c={...base,...changes,preset};if(!['points','games'].includes(c.kind)||!Array.isArray(c.steps)||c.steps.length<1||c.steps.length>5||new Set(c.steps).size!==c.steps.length||c.steps.some(n=>!number(n,.01,999))||!integer(c.periods,1,20)||!integer(c.seconds,0,7200)||typeof c.unit!=='string'||!c.unit.trim()||c.unit.length>24||typeof c.game!=='string'||!c.game.trim()||c.game.length>24||typeof c.counter!=='string'||c.counter.length>24)throw Error('Invalid scoreboard settings.');return {preset,kind:c.kind,steps:[...c.steps],periods:c.periods,seconds:c.seconds,unit:c.unit.trim(),game:c.game.trim(),counter:c.counter.trim()};}
function compatible(c,s){return (s.mode==='series'&&c.kind==='games')||(s.mode!=='series'&&c.kind==='points');}
function defaultFor(s){return config(s.mode==='series'?'esports':s.mode==='low'?'racing':'general');}
function signature(m){return JSON.stringify([m.slots.map(s=>s.player),m.result??null]);}
function create(m,c){return {id:m.id,signature:signature(m),config:config(c.preset,c),score:[0,0],counters:[0,0],games:[],period:1,periods:[],clock:{remaining:c.seconds*1000,deadline:null},note:'',published:false};}
function pair(v,max=999999){return Array.isArray(v)&&v.length===2&&v.every(n=>number(n,0,max));}
function valid(b,m){try{if(!b||b.id!==m.id||b.signature!==signature(m)||!['ready','complete'].includes(m.state)||m.slots.length!==2||typeof b.published!=='boolean'||b.published!==(m.state==='complete'))return false;const c=config(b.config.preset,b.config);return pair(b.score)&&pair(b.counters)&&b.counters.every(Number.isInteger)&&integer(b.period,1,c.periods+20)&&Array.isArray(b.games)&&b.games.length<=9&&b.games.every(g=>pair(g.score)&&[0,1].includes(g.winner))&&Array.isArray(b.periods)&&b.periods.length<=39&&b.periods.every(p=>integer(p.period,1,40)&&pair(p.score)&&pair(p.counters))&&b.clock&&number(b.clock.remaining,0,7200000)&&(b.clock.deadline===null||number(b.clock.deadline,0,8640000000000000))&&typeof b.note==='string'&&b.note.length<=500;}catch{return false;}}
function remaining(b,now=Date.now()){return Math.max(0,b.clock.deadline===null?b.clock.remaining:b.clock.deadline-now);}
function running(b,now=Date.now()){return b.clock.deadline!==null&&remaining(b,now)>0;}
function clock(b,action,now=Date.now()){if(!b.config.seconds)throw Error('This scoreboard has no clock. Enable it in settings.');const left=remaining(b,now);if(action==='start'){if(!left)throw Error('Clock is at zero. Reset or adjust it first.');b.clock={remaining:left,deadline:now+left};}else if(action==='pause')b.clock={remaining:left,deadline:null};else if(action==='reset')b.clock={remaining:b.config.seconds*1000,deadline:null};else throw Error('Unknown clock action.');return b;}
function setClock(b,seconds){if(!b.config.seconds||!integer(seconds,0,7200))throw Error('Enter a clock time from 0 to 120 minutes (in seconds).');b.clock={remaining:seconds*1000,deadline:null};}
function displayTime(ms){const s=Math.ceil(Math.max(0,ms)/1000);return `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;}
function adjust(b,side,delta,counter=false){if(![0,1].includes(side)||!number(delta,-999999,999999))throw Error('Invalid adjustment.');const a=counter?b.counters:b.score;a[side]=Math.max(0,Math.min(999999,Math.round((a[side]+delta)*100)/100));}
function wins(b){return [b.games.filter(g=>g.winner===0).length,b.games.filter(g=>g.winner===1).length];}
function award(b,side,s){if(b.config.kind!=='games'||!compatible(b.config,s)||![0,1].includes(side))throw Error('Game wins require a best-of-series division.');const w=wins(b),need=(s.bestOf+1)/2;if(Math.max(...w)>=need)throw Error('The series is already decided. Undo the last game to correct it.');if(b.score[0]!==b.score[1]&&b.score[side]<b.score[1-side])throw Error('The selected winner has fewer points. Correct the current game score first.');b.games.push({winner:side,score:[...b.score]});b.score=[0,0];b.counters=[0,0];b.clock={remaining:b.config.seconds*1000,deadline:null};}
function undoGame(b){const g=b.games.pop();if(!g)throw Error('No recorded game to undo.');b.score=[...g.score];b.clock={remaining:b.config.seconds*1000,deadline:null};}
function advancePeriod(b){if(b.config.kind!=='points'||b.period>=b.config.periods+20)throw Error('No more periods available.');b.periods.push({period:b.period,score:[...b.score],counters:[...b.counters]});b.period++;b.clock={remaining:b.config.seconds*1000,deadline:null};}
function input(b,s,reason='score',winner=null){if(!compatible(b.config,s))throw Error('Scoreboard does not match division scoring.');if(reason!=='score')return {reason,winner};const [a,c]=b.config.kind==='games'?wins(b):b.score;return {a,b:c,reason:'score'};}
return {presets,config,compatible,defaultFor,signature,create,valid,remaining,running,clock,setClock,displayTime,adjust,wins,award,undoGame,advancePeriod,input};
});
