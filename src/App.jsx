import { useState, useEffect, useRef } from "react";

const WHATSAPP = "919949682097";

const products = [
  { id:1,  name:"Seer Fish (Vanjaram)",  weight:"500g", price:449, tag:"Bestseller",  cat:"Fresh Fish",    img:"https://cambaytiger.com/cdn/shop/files/SeerFish_1_0c2a8f10-0148-4d3d-9aca-b9bc875d2a14.jpg?v=1714978055", desc:"Cleaned & cut, pulusu-ready" },
  { id:3,  name:"Pomfret (Whole)",       weight:"500g", price:549, tag:"Premium",     cat:"Fresh Fish",    img:"https://www.bigbasket.com/media/uploads/p/xxl/40117160_4-fresho-pomfret-white-fish-large-cleaned-whole.jpg", desc:"Tawa-ready, slit & cleaned" },
  { id:14, name:"Kingfish / Surmai",     weight:"500g", price:399, tag:"Fresh Today", cat:"Fresh Fish",    img:"https://sealiciousfoods.com/wp-content/uploads/2022/01/king-fish.jpg", desc:"Firm flesh, fry or curry cut" },
  { id:15, name:"Tuna",                  weight:"500g", price:479, tag:"",            cat:"Fresh Fish",    img:"https://www.bigbasket.com/media/uploads/p/xxl/40178135_3-fresho-tuna-fish-steak-slice.jpg", desc:"Steak-cut, grill or curry" },
  { id:16, name:"Silver Pomfret",        weight:"500g", price:599, tag:"Premium",     cat:"Fresh Fish",    img:"https://www.spmbfisheries.in/wp-content/uploads/2019/01/silverpomfret.jpg", desc:"Whole cleaned, tawa-ready" },
  { id:17, name:"Lobster",               weight:"500g", price:999, tag:"🔥 Special",  cat:"Fresh Fish",    img:"https://adamseafood.com/cdn/shop/products/FRESHINDIANLOBSTERSMALL_1080x.jpg", desc:"Fresh, whole — pre-order advised" },
  { id:8,  name:"Squid (Cleaned)",       weight:"300g", price:349, tag:"",            cat:"Prawns & Crab", img:"https://nuste.in/cdn/shop/files/SquidRings_1.jpg?v=1688623887", desc:"Cleaned, ring-cut, fry-ready" },
  { id:9,  name:"Tiger Prawns",          weight:"500g", price:699, tag:"Premium",     cat:"Prawns & Crab", img:"https://www.bigbasket.com/media/uploads/p/xxl/40227539_3-fresho-tiger-prawns-cleaned-deveined-with-tail.jpg", desc:"Fresh, large, deveined" },
  { id:10, name:"Medium Prawns",         weight:"500g", price:399, tag:"",            cat:"Prawns & Crab", img:"https://cambaytiger.com/cdn/shop/files/MediumPrawns.jpg", desc:"Cleaned & deveined" },
  { id:11, name:"Small Prawns",          weight:"500g", price:299, tag:"",            cat:"Prawns & Crab", img:"https://cambaytiger.com/cdn/shop/files/SmallPrawns.jpg", desc:"Cleaned, fry or curry use" },
  { id:12, name:"Mud Crab",              weight:"500g", price:649, tag:"Fresh Today", cat:"Prawns & Crab", img:"https://www.bigbasket.com/media/uploads/p/xxl/40218950_3-fresho-mud-crab-cut-cleaned.jpg", desc:"Live-to-cleaned, same morning" },
  { id:13, name:"Blue Swimming Crab",    weight:"500g", price:449, tag:"",            cat:"Prawns & Crab", img:"https://cambaytiger.com/cdn/shop/files/BlueCrab.jpg", desc:"Cleaned, curry-cut" },
];

const cats = ["All", "Fresh Fish", "Prawns & Crab"];

export default function DhanushyaSeafoods() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCat, setActiveCat] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true }));
      }), { threshold: 0.1 }
    );
    document.querySelectorAll("[data-id]").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const add = id => setCart(c => ({ ...c, [id]: (c[id]||0)+1 }));
  const rem = id => setCart(c => { const n={...c}; n[id]>1 ? n[id]-- : delete n[id]; return n; });

  const items = Object.entries(cart).map(([id,qty]) => ({ ...products.find(p=>p.id===+id), qty }));
  const total = items.reduce((s,i) => s+i.price*i.qty, 0);
  const count = items.reduce((s,i) => s+i.qty, 0);

  const waOrder = () => {
    const lines = items.map(i=>`• ${i.name} (${i.weight}) x${i.qty} = ₹${i.price*i.qty}`).join("\n");
    const msg = `Hi Dhanushya Seafoods! 🐟\n\nMy order:\n${lines}\n\n*Total: ₹${total}*\n\nPlease confirm delivery slot.`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,"_blank");
  };

  const filtered = activeCat==="All" ? products : products.filter(p=>p.cat===activeCat);

  const reveal = (id, delay=0) => ({
    "data-id": id,
    style: {
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      opacity: visible[id] ? 1 : 0,
      transform: visible[id] ? "translateY(0)" : "translateY(28px)",
    }
  });

  return (
    <div style={{ fontFamily:"'Cormorant Garamond','Georgia',serif", background:"#FDFAF6", color:"#1A2E2A", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:#FDFAF6;}
        ::-webkit-scrollbar-thumb{background:#0D9488;border-radius:3px;}
        .sans{font-family:'DM Sans',sans-serif;}
        @keyframes sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
        @keyframes bobble{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes ripple{0%{transform:scale(1);opacity:0.6}100%{transform:scale(2.5);opacity:0}}
        @keyframes wavemove{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes shimmer{0%{background-position:0%}100%{background-position:200%}}
        .bobble{animation:bobble 3s ease-in-out infinite;}
        .sway{animation:sway 4s ease-in-out infinite;transform-origin:top center;}
        .teal-text{
          background:linear-gradient(135deg,#0D9488,#0369A1,#0D9488);
          background-size:200%;
          -webkit-background-clip:text;-webkit-text-fill-color:transparent;
          animation:shimmer 4s linear infinite;
        }
        .nav-link{font-family:'DM Sans',sans-serif;font-size:13px;color:#4A6663;text-decoration:none;transition:color 0.2s;cursor:pointer;letter-spacing:0.3px;}
        .nav-link:hover{color:#0D9488;}
        .btn-teal{background:linear-gradient(135deg,#0D9488,#0F766E);color:white;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;border-radius:50px;transition:all 0.3s;}
        .btn-teal:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(13,148,136,0.3);}
        .btn-outline{background:transparent;color:#0D9488;border:1.5px solid #0D9488;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;border-radius:50px;transition:all 0.3s;}
        .btn-outline:hover{background:#0D9488;color:white;}
        .card{background:white;border-radius:20px;border:1px solid rgba(13,148,136,0.1);transition:all 0.3s;overflow:hidden;}
        .card:hover{transform:translateY(-5px);box-shadow:0 18px 40px rgba(13,148,136,0.12);border-color:rgba(13,148,136,0.25);}
        .cat-btn{font-family:'DM Sans',sans-serif;font-size:13px;padding:8px 20px;border-radius:50px;border:1.5px solid rgba(13,148,136,0.2);cursor:pointer;transition:all 0.25s;color:#4A6663;background:white;}
        .cat-btn.active{background:linear-gradient(135deg,#0D9488,#0F766E);color:white;border-color:transparent;box-shadow:0 4px 14px rgba(13,148,136,0.25);}
        .cat-btn:hover:not(.active){border-color:#0D9488;color:#0D9488;}
        .qty-btn{width:30px;height:30px;border-radius:50%;border:1.5px solid rgba(13,148,136,0.3);background:white;color:#0D9488;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:all 0.2s;font-family:'DM Sans',sans-serif;}
        .qty-btn:hover{background:#0D9488;color:white;border-color:#0D9488;}
        .tag{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:600;padding:3px 9px;border-radius:20px;background:rgba(13,148,136,0.1);color:#0D9488;letter-spacing:0.5px;}
        .overlay{position:fixed;inset:0;background:rgba(26,46,42,0.35);z-index:49;backdrop-filter:blur(3px);}

        /* Fishing bucket cart styles */
        .bucket-handle{
          width:60px;height:20px;border:3px solid #8B6914;border-bottom:none;
          border-radius:30px 30px 0 0;margin:0 auto;position:relative;top:4px;
        }
        .bucket-body{
          width:90px;height:70px;
          background:linear-gradient(160deg,#E8B84B,#C8960A);
          border-radius:6px 6px 18px 18px;
          position:relative;overflow:hidden;
          border:2px solid #A87A08;
          box-shadow:inset -6px 0 12px rgba(0,0,0,0.15),0 4px 12px rgba(0,0,0,0.15);
        }
        .bucket-stripe{position:absolute;top:22px;left:0;right:0;height:3px;background:rgba(0,0,0,0.12);}
        .bucket-shine{position:absolute;top:6px;left:8px;width:12px;height:40px;background:rgba(255,255,255,0.25);border-radius:6px;transform:rotate(-10deg);}
        .bucket-water{
          position:absolute;bottom:0;left:0;right:0;
          background:linear-gradient(180deg,rgba(13,148,136,0.7),rgba(7,94,84,0.9));
          transition:height 0.4s ease;border-radius:0 0 16px 16px;
        }
        .bucket-fish{position:absolute;font-size:16px;animation:bobble 2s ease-in-out infinite;}
        .ripple-ring{
          position:absolute;border-radius:50%;
          border:1.5px solid rgba(13,148,136,0.5);
          animation:ripple 1.5s ease-out infinite;
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:40,
        padding:"0 6%",height:66,
        background: scrolled ? "rgba(253,250,246,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(13,148,136,0.12)" : "none",
        transition:"all 0.4s",
        display:"flex",alignItems:"center",justifyContent:"space-between",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:28}} className="bobble">🐟</span>
          <div>
            <div style={{fontSize:17,fontWeight:700,letterSpacing:1.5,color:"#1A2E2A",lineHeight:1}}>DHANUSHYA</div>
            <div className="sans" style={{fontSize:9,color:"#0D9488",letterSpacing:4}}>SEAFOODS · VIZAG</div>
          </div>
        </div>
        <div style={{display:"flex",gap:28,alignItems:"center"}}>
          {["Menu","Story","Catering","Delivery"].map(l=>(
            <a key={l} className="nav-link" href={`#${l.toLowerCase()}`}>{l}</a>
          ))}
        </div>
        <button onClick={()=>setCartOpen(true)} style={{
          display:"flex",alignItems:"center",gap:10,padding:"9px 18px",
          background:"transparent",border:"1.5px solid rgba(13,148,136,0.3)",
          borderRadius:50,cursor:"pointer",transition:"all 0.3s",
          color:"#1A2E2A",fontFamily:"'DM Sans',sans-serif",fontSize:13,
        }}
        onMouseEnter={e=>{e.currentTarget.style.borderColor="#0D9488";e.currentTarget.style.background="rgba(13,148,136,0.05)";}}
        onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(13,148,136,0.3)";e.currentTarget.style.background="transparent";}}>
          {/* Mini bucket icon in nav */}
          <div style={{position:"relative",width:22,height:26}}>
            <div style={{width:16,height:6,border:"2px solid #8B6914",borderBottom:"none",borderRadius:"8px 8px 0 0",margin:"0 auto",position:"relative",top:2}}/>
            <div style={{width:22,height:18,background:"linear-gradient(160deg,#E8B84B,#C8960A)",borderRadius:"3px 3px 7px 7px",border:"1.5px solid #A87A08",position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:`${Math.min(100,count*20)}%`,background:"rgba(13,148,136,0.6)",borderRadius:"0 0 5px 5px",transition:"height 0.3s"}}/>
            </div>
          </div>
          <span className="sans">Catch</span>
          {count>0&&(
            <span style={{background:"#0D9488",color:"white",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700}}>
              {count}
            </span>
          )}
        </button>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        minHeight:"100vh",display:"flex",alignItems:"center",
        background:"linear-gradient(160deg,#FDFAF6 0%,#F0FAF8 50%,#E6F7F5 100%)",
        position:"relative",overflow:"hidden",
      }}>
        {/* Subtle wave bg */}
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:180,overflow:"hidden",opacity:0.4}}>
          <div style={{display:"flex",animation:"wavemove 10s linear infinite",width:"200%"}}>
            <svg viewBox="0 0 1200 180" style={{width:"50%",minWidth:600}} preserveAspectRatio="none">
              <path d="M0 80 Q150 30 300 80 Q450 130 600 80 Q750 30 900 80 Q1050 130 1200 80 L1200 180 L0 180Z" fill="rgba(13,148,136,0.08)"/>
            </svg>
            <svg viewBox="0 0 1200 180" style={{width:"50%",minWidth:600}} preserveAspectRatio="none">
              <path d="M0 80 Q150 30 300 80 Q450 130 600 80 Q750 30 900 80 Q1050 130 1200 80 L1200 180 L0 180Z" fill="rgba(13,148,136,0.08)"/>
            </svg>
          </div>
        </div>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:120,overflow:"hidden",opacity:0.3}}>
          <div style={{display:"flex",animation:"wavemove 14s linear infinite reverse",width:"200%"}}>
            <svg viewBox="0 0 1200 120" style={{width:"50%",minWidth:600}} preserveAspectRatio="none">
              <path d="M0 60 Q200 20 400 60 Q600 100 800 60 Q1000 20 1200 60 L1200 120 L0 120Z" fill="rgba(13,148,136,0.12)"/>
            </svg>
            <svg viewBox="0 0 1200 120" style={{width:"50%",minWidth:600}} preserveAspectRatio="none">
              <path d="M0 60 Q200 20 400 60 Q600 100 800 60 Q1000 20 1200 60 L1200 120 L0 120Z" fill="rgba(13,148,136,0.12)"/>
            </svg>
          </div>
        </div>

        {/* Decorative fish scattered */}
        {[["🐟","12%","20%","3s","0s"],["🦐","85%","30%","4s","1s"],["🦀","8%","70%","3.5s","0.5s"],["🐠","88%","65%","4s","1.5s"]].map(([e,l,t,dur,delay])=>(
          <div key={l} style={{position:"absolute",left:l,top:t,fontSize:28,opacity:0.12,animation:`bobble ${dur} ease-in-out infinite`,animationDelay:delay}}>{e}</div>
        ))}

        <div style={{position:"relative",zIndex:2,padding:"130px 8% 80px",maxWidth:1200,margin:"0 auto",width:"100%"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:70,alignItems:"center"}}>
            <div>
              <div className="sans" style={{fontSize:11,letterSpacing:5,color:"#0D9488",marginBottom:18,textTransform:"uppercase",fontWeight:600}}>
                Vizag Harbour · Caught Daily at 5AM
              </div>
              <h1 style={{fontSize:"clamp(38px,4.5vw,62px)",fontWeight:700,lineHeight:1.1,marginBottom:22,color:"#1A2E2A"}}>
                The Freshest Catch<br/>
                <span className="teal-text">Harbour to Kitchen</span>
              </h1>
              <p className="sans" style={{fontSize:16,color:"#4A6663",lineHeight:1.85,marginBottom:32,maxWidth:430}}>
                We're at Vizag harbour every morning at 5AM. Cleaned, cut and packed by noon. On your plate by evening. Every label shows the exact catch time — because freshness is a timestamp, not a tagline.
              </p>
              <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                <button className="btn-teal" style={{padding:"13px 30px",fontSize:15}}
                  onClick={()=>document.getElementById("menu")?.scrollIntoView({behavior:"smooth"})}>
                  Shop Fresh Catch →
                </button>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"
                  style={{display:"flex",alignItems:"center",gap:8,padding:"13px 26px",borderRadius:50,border:"1.5px solid rgba(13,148,136,0.4)",color:"#0D9488",textDecoration:"none",fontSize:15,fontFamily:"'DM Sans',sans-serif",fontWeight:500,transition:"all 0.3s",background:"white"}}
                  onMouseEnter={e=>{e.currentTarget.style.background="#0D9488";e.currentTarget.style.color="white";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="white";e.currentTarget.style.color="#0D9488";}}>
                  💬 WhatsApp
                </a>
              </div>
              <div className="sans" style={{display:"flex",gap:36,marginTop:44}}>
                {[["5AM","Daily Harbour Catch"],["2hr","Sea to Packed"],["0°C","Cold Chain Intact"]].map(([n,l])=>(
                  <div key={n}>
                    <div style={{fontSize:24,fontWeight:700,color:"#0D9488"}}>{n}</div>
                    <div style={{fontSize:11,color:"#7A9E9A",letterSpacing:0.5,marginTop:2}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero visual — fishing bucket with fish */}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative"}}>
              {/* Large decorative bucket */}
              <div style={{position:"relative",marginBottom:20}}>
                <div style={{width:80,height:26,border:"4px solid #8B6914",borderBottom:"none",borderRadius:"40px 40px 0 0",margin:"0 auto",position:"relative",top:6,zIndex:2}}/>
                <div style={{width:180,height:200,background:"linear-gradient(160deg,#F0C45A,#C8960A,#A87A08)",borderRadius:"12px 12px 50px 50px",position:"relative",overflow:"hidden",border:"3px solid #A87A08",boxShadow:"inset -12px 0 24px rgba(0,0,0,0.15), 0 12px 40px rgba(168,122,8,0.25)"}}>
                  {/* Bucket stripes */}
                  <div style={{position:"absolute",top:44,left:0,right:0,height:4,background:"rgba(0,0,0,0.1)"}}/>
                  <div style={{position:"absolute",top:80,left:0,right:0,height:3,background:"rgba(0,0,0,0.08)"}}/>
                  {/* Shine */}
                  <div style={{position:"absolute",top:10,left:16,width:22,height:120,background:"rgba(255,255,255,0.2)",borderRadius:12,transform:"rotate(-8deg)"}}/>
                  {/* Water fill */}
                  <div style={{position:"absolute",bottom:0,left:0,right:0,height:"55%",background:"linear-gradient(180deg,rgba(13,148,136,0.5) 0%,rgba(7,94,84,0.8) 100%)",borderRadius:"0 0 47px 47px",transition:"height 0.4s"}}>
                    {/* Ripple rings on water surface */}
                    <div style={{position:"absolute",top:8,left:"50%",transform:"translateX(-50%)",width:60,height:20,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,0.3)",animation:"ripple 2s ease-out infinite"}}/>
                    <div style={{position:"absolute",top:8,left:"50%",transform:"translateX(-50%)",width:40,height:14,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,0.2)",animation:"ripple 2s ease-out infinite",animationDelay:"0.5s"}}/>
                    {/* Fish peeking from water */}
                    <div style={{position:"absolute",top:-16,left:"50%",transform:"translateX(-60%)",fontSize:32,animation:"bobble 2s ease-in-out infinite"}}>🐟</div>
                    <div style={{position:"absolute",top:-10,right:22,fontSize:22,animation:"bobble 2.5s ease-in-out infinite",animationDelay:"0.8s"}}>🦐</div>
                  </div>
                  {/* Label on bucket */}
                  <div style={{position:"absolute",top:14,left:0,right:0,textAlign:"center"}}>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.9)",letterSpacing:2}}>DHANUSHYA</div>
                    <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,color:"rgba(255,255,255,0.65)",letterSpacing:3}}>SEAFOODS</div>
                  </div>
                </div>
              </div>
              {/* Catch time stamp card */}
              <div style={{background:"white",borderRadius:16,padding:"14px 22px",border:"1px solid rgba(13,148,136,0.15)",boxShadow:"0 8px 24px rgba(13,148,136,0.1)",textAlign:"center"}}>
                <div className="sans" style={{fontSize:10,color:"#0D9488",letterSpacing:3,marginBottom:4}}>TODAY'S CATCH</div>
                <div style={{fontSize:15,fontWeight:600,color:"#1A2E2A"}}>Cut at Harbour 5:47 AM</div>
                <div className="sans" style={{fontSize:11,color:"#7A9E9A",marginTop:2}}>Packed by 12:00 PM · Delivering by 5PM</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{padding:"80px 8%",background:"white"}}>
        <div {...reveal("hiw")} style={{textAlign:"center",marginBottom:52}}>
          <div className="sans" style={{fontSize:11,letterSpacing:5,color:"#0D9488",marginBottom:10,fontWeight:600}}>THE PROCESS</div>
          <h2 style={{fontSize:36,fontWeight:700,color:"#1A2E2A"}}>From Sea to Your Plate</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,maxWidth:1100,margin:"0 auto"}}>
          {[
            ["🌅","5:00 AM","Harbour Catch","Our buyer picks the freshest catch at Vizag harbour — first pick every morning."],
            ["🔪","7:00 AM","Clean & Cut","Fish cleaned, scaled, cut to your preferred style — pulusu, tawa, or curry cut."],
            ["📦","11:00 AM","Weigh & Pack","Packed in food-grade pouches with the exact catch timestamp on every label."],
            ["🚴","4:00 PM","Fresh Delivery","Delivered same evening or next morning — cold chain maintained throughout."],
          ].map(([ico,time,title,desc],i)=>(
            <div key={i} {...reveal(`hiw${i}`,i*100)} style={{background:"#F8FFFE",borderRadius:20,border:"1px solid rgba(13,148,136,0.1)",padding:"28px 20px",position:"relative"}}>
              <div className="sans" style={{fontSize:11,color:"#0D9488",letterSpacing:2,marginBottom:10,fontWeight:600}}>{time}</div>
              <div style={{fontSize:38,marginBottom:14}}>{ico}</div>
              <div style={{fontSize:16,fontWeight:700,color:"#1A2E2A",marginBottom:10}}>{title}</div>
              <p className="sans" style={{fontSize:13,color:"#6A8E8A",lineHeight:1.75}}>{desc}</p>
              <div className="sans" style={{position:"absolute",top:20,right:20,fontSize:40,fontWeight:900,color:"rgba(13,148,136,0.06)"}}>{i+1}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" style={{padding:"80px 8%",background:"#FDFAF6"}}>
        <div {...reveal("menu-hdr")} style={{textAlign:"center",marginBottom:40}}>
          <div className="sans" style={{fontSize:11,letterSpacing:5,color:"#0D9488",marginBottom:10,fontWeight:600}}>FRESH TODAY</div>
          <h2 style={{fontSize:36,fontWeight:700,color:"#1A2E2A"}}>Today's Catch</h2>
          <p className="sans" style={{fontSize:14,color:"#6A8E8A",marginTop:10}}>All prices per 500g unless noted · Cleaned & cut to order</p>
        </div>
        <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:40,flexWrap:"wrap"}}>
          {cats.map(c=>(
            <button key={c} className={`cat-btn ${activeCat===c?"active":""}`} onClick={()=>setActiveCat(c)}>{c}</button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))",gap:18,maxWidth:1200,margin:"0 auto"}}>
          {filtered.map((p,i)=>(
            <div key={p.id} {...reveal(`p${p.id}`,i*50)} className="card" style={{padding:0,overflow:"hidden"}}>
              {/* Product image */}
              <div style={{height:160,overflow:"hidden",position:"relative",background:"#F0FAF8"}}>
                <img
                  src={p.img}
                  alt={p.name}
                  style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s"}}
                  onMouseEnter={e=>e.currentTarget.style.transform="scale(1.07)"}
                  onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                  onError={e=>{e.currentTarget.style.display="none";e.currentTarget.parentNode.style.fontSize="60px";e.currentTarget.parentNode.style.display="flex";e.currentTarget.parentNode.style.alignItems="center";e.currentTarget.parentNode.style.justifyContent="center";}}
                />
                {p.tag&&(
                  <span className="tag" style={{position:"absolute",top:10,right:10,background:"rgba(255,255,255,0.92)",backdropFilter:"blur(4px)"}}>
                    {p.tag}
                  </span>
                )}
              </div>
              <div style={{padding:"18px 18px 20px"}}>
                <div style={{fontSize:16,fontWeight:700,color:"#1A2E2A",marginBottom:3}}>{p.name}</div>
                <div className="sans" style={{fontSize:12,color:"#9ABAB6",marginBottom:4}}>{p.weight}</div>
                <div className="sans" style={{fontSize:12,color:"#7A9E9A",marginBottom:16,lineHeight:1.6}}>{p.desc}</div>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontSize:22,fontWeight:700,color:"#0D9488"}}>₹{p.price}</span>
                  {cart[p.id] ? (
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                      <button className="qty-btn" onClick={()=>rem(p.id)}>−</button>
                      <span className="sans" style={{fontSize:15,fontWeight:600,minWidth:20,textAlign:"center",color:"#1A2E2A"}}>{cart[p.id]}</span>
                      <button className="qty-btn" onClick={()=>add(p.id)}>+</button>
                    </div>
                  ):(
                    <button className="btn-teal" style={{padding:"8px 18px",fontSize:13}} onClick={()=>add(p.id)}>
                      Add +
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY ── */}
      <section id="story" style={{padding:"80px 8%",background:"white"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"center"}}>
          <div {...reveal("story-l")}>
            <div className="sans" style={{fontSize:11,letterSpacing:5,color:"#0D9488",marginBottom:16,fontWeight:600}}>WHY DHANUSHYA</div>
            <h2 style={{fontSize:38,fontWeight:700,lineHeight:1.2,marginBottom:22,color:"#1A2E2A"}}>
              We're at the Harbour<br/><em style={{color:"#0D9488"}}>Before You Wake Up</em>
            </h2>
            <p className="sans" style={{fontSize:15,color:"#4A6663",lineHeight:1.9,marginBottom:18}}>
              Licious ships from Bangalore. FreshToHome from a warehouse. We walk to the harbour at 5AM and pick the best fish ourselves — every single day.
            </p>
            <p className="sans" style={{fontSize:15,color:"#4A6663",lineHeight:1.9,marginBottom:28}}>
              Every pack has a timestamp. <strong style={{color:"#1A2E2A"}}>Caught at 5:47 AM. Cleaned by 8 AM. Packed by noon.</strong> Not as a story. As a fact, printed on the label.
            </p>
            <div style={{borderLeft:"3px solid #0D9488",paddingLeft:20,fontStyle:"italic",fontSize:16,color:"#2A4E4A",lineHeight:1.75}}>
              "If you have time to go to the harbour yourself, go. We're for the days when you don't."
            </div>
          </div>
          <div {...reveal("story-r",200)}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              {[["🐟","13+","Fresh SKUs Daily"],["⏱️","< 2hr","Sea to Packed"],["📍","6","Delivery Zones"],["⭐","0","Middlemen"]].map(([ico,n,l])=>(
                <div key={l} style={{background:"#F0FAF8",border:"1px solid rgba(13,148,136,0.12)",borderRadius:18,padding:"26px 18px",textAlign:"center"}}>
                  <div style={{fontSize:30,marginBottom:8}}>{ico}</div>
                  <div style={{fontSize:26,fontWeight:700,color:"#0D9488"}}>{n}</div>
                  <div className="sans" style={{fontSize:11,color:"#7A9E9A",marginTop:4}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERY ── */}
      <section id="delivery" style={{padding:"80px 8%",background:"#F0FAF8"}}>
        <div {...reveal("del-hdr")} style={{textAlign:"center",marginBottom:48}}>
          <div className="sans" style={{fontSize:11,letterSpacing:5,color:"#0D9488",marginBottom:10,fontWeight:600}}>COVERAGE</div>
          <h2 style={{fontSize:36,fontWeight:700,color:"#1A2E2A"}}>Delivery Areas & Slots</h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,maxWidth:860,margin:"0 auto"}}>
          <div {...reveal("del-a")} className="card" style={{padding:"32px 26px"}}>
            <div style={{fontSize:20,fontWeight:700,color:"#1A2E2A",marginBottom:6}}>📍 Delivery Zones</div>
            <div className="sans" style={{fontSize:13,color:"#0D9488",marginBottom:18,fontWeight:600}}>All Areas Across Visakhapatnam</div>
            {[
              "MVP Colony","Seethammadhara","Madhurawada","Rushikonda",
              "PM Palem","Dwaraka Nagar","Gajuwaka","Bheemunipatnam",
              "Kommadi","Lawsons Bay","Siripuram","NAD Junction",
              "Akkayyapalem","Gopalapatnam","Pendurthi","Yelamanchili",
            ].map(z=>(
              <div key={z} className="sans" style={{display:"flex",alignItems:"center",gap:10,marginBottom:10,fontSize:13,color:"#4A6663"}}>
                <span style={{color:"#0D9488",fontWeight:700}}>→</span> {z}
              </div>
            ))}
            <div style={{marginTop:18,padding:"12px 14px",background:"#F0FAF8",borderRadius:10,border:"1px solid rgba(13,148,136,0.15)"}}>
              <div className="sans" style={{fontSize:12,color:"#0D9488",fontWeight:600}}>📞 Don't see your area?</div>
              <div className="sans" style={{fontSize:12,color:"#6A8E8A",marginTop:4}}>WhatsApp us — we deliver anywhere in Vizag for bulk orders.</div>
            </div>
          </div>
          <div {...reveal("del-b",150)} style={{display:"flex",flexDirection:"column",gap:16}}>
            <div className="card" style={{padding:"26px 24px"}}>
              <div style={{fontSize:18,fontWeight:700,color:"#1A2E2A",marginBottom:6}}>🕓 Evening Slot</div>
              <div className="sans" style={{fontSize:16,color:"#0D9488",fontWeight:600,marginBottom:6}}>4:00 PM – 7:00 PM</div>
              <div className="sans" style={{fontSize:13,color:"#7A9E9A"}}>Order by 1:00 PM same day</div>
            </div>
            <div className="card" style={{padding:"26px 24px"}}>
              <div style={{fontSize:18,fontWeight:700,color:"#1A2E2A",marginBottom:6}}>🌅 Morning Slot</div>
              <div className="sans" style={{fontSize:16,color:"#0D9488",fontWeight:600,marginBottom:6}}>7:00 AM – 9:00 AM</div>
              <div className="sans" style={{fontSize:13,color:"#7A9E9A"}}>Order by 10:00 PM previous night</div>
            </div>
            <div className="sans" style={{fontSize:13,color:"#6A8E8A",textAlign:"center",padding:"8px 0"}}>
              Free delivery above ₹699 · ₹39 below · Min order ₹399
            </div>
          </div>
        </div>
      </section>

      {/* ── CATERING & FUNCTIONS ── */}
      <section id="catering" style={{padding:"80px 8%",background:"#1A2E2A",position:"relative",overflow:"hidden"}}>
        {/* Subtle wave decoration */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:"linear-gradient(90deg,transparent,#0D9488,transparent)"}}/>

        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div {...reveal("cat-hdr")} style={{textAlign:"center",marginBottom:52}}>
            <div className="sans" style={{fontSize:11,letterSpacing:5,color:"#0D9488",marginBottom:10,fontWeight:600}}>LARGE ORDERS WELCOME</div>
            <h2 style={{fontSize:38,fontWeight:700,color:"white",marginBottom:14}}>Catering & Functions</h2>
            <p className="sans" style={{fontSize:15,color:"rgba(240,250,248,0.55)",maxWidth:520,margin:"0 auto",lineHeight:1.8}}>
              Marriages, engagements, housewarming, corporate events — we supply fresh seafood in any quantity, cleaned and cut to your requirement. No minimum order.
            </p>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,marginBottom:48}}>
            {[
              ["💍","Marriages & Receptions","Hundreds of kilos of seer, rohu, prawns, crab — all cleaned and portioned for your caterer. Delivered the morning of the function."],
              ["🏠","Housewarming & Griha Pravesh","Fresh fish bundles for intimate functions. We coordinate timing with your kitchen staff so everything is fresh when cooking begins."],
              ["🏢","Corporate & Bulk Orders","Regular large-volume supply for canteens, hotels, restaurants, and event caterers. Consistent quality, consistent timing."],
            ].map(([ico,title,desc],i)=>(
              <div key={i} {...reveal(`cat${i}`,i*120)} style={{
                background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(13,148,136,0.25)",
                borderRadius:20,padding:"30px 24px",
                transition:"all 0.3s",
              }}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(13,148,136,0.12)";e.currentTarget.style.borderColor="rgba(13,148,136,0.5)";}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.borderColor="rgba(13,148,136,0.25)";}}>
                <div style={{fontSize:38,marginBottom:16}}>{ico}</div>
                <div style={{fontSize:17,fontWeight:700,color:"white",marginBottom:10}}>{title}</div>
                <p className="sans" style={{fontSize:13,color:"rgba(240,250,248,0.55)",lineHeight:1.75}}>{desc}</p>
              </div>
            ))}
          </div>

          {/* What we supply */}
          <div {...reveal("cat-supply")} style={{background:"rgba(13,148,136,0.1)",border:"1px solid rgba(13,148,136,0.2)",borderRadius:20,padding:"32px 36px",marginBottom:36}}>
            <div style={{fontSize:18,fontWeight:700,color:"white",marginBottom:20}}>What We Can Supply for Your Function</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:12}}>
              {[
                ["🐟","Seer Fish (Vanjaram)","Any quantity"],
                ["🐠","Rohu / Catla","Curry cut or whole"],
                ["🐡","Pomfret","Tawa or curry ready"],
                ["🦐","Tiger & Medium Prawns","Cleaned, deveined"],
                ["🦀","Crab","Cleaned, curry cut"],
                ["🦑","Squid","Cleaned, ring cut"],
                ["🐟","Sardines / Mackerel","Bulk fry packs"],
                ["🐡","Red Snapper","Premium functions"],
              ].map(([ico,name,note])=>(
                <div key={name} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"rgba(255,255,255,0.04)",borderRadius:10,border:"1px solid rgba(255,255,255,0.06)"}}>
                  <span style={{fontSize:20}}>{ico}</span>
                  <div>
                    <div className="sans" style={{fontSize:12,fontWeight:600,color:"rgba(240,250,248,0.85)"}}>{name}</div>
                    <div className="sans" style={{fontSize:10,color:"rgba(240,250,248,0.35)",marginTop:1}}>{note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div {...reveal("cat-cta")} style={{textAlign:"center"}}>
            <div className="sans" style={{fontSize:14,color:"rgba(240,250,248,0.5)",marginBottom:20}}>
              Call us at least <strong style={{color:"rgba(240,250,248,0.8)"}}>2 days in advance</strong> for bulk orders. Same-day possible for orders under 10kg.
            </div>
            <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}>
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Dhanushya Seafoods! I need to enquire about bulk/catering supply for a function. Please share details.")}`}
                target="_blank" rel="noreferrer"
                style={{display:"flex",alignItems:"center",gap:10,padding:"14px 32px",background:"#25D366",borderRadius:50,color:"white",textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontSize:15,fontWeight:600,boxShadow:"0 6px 20px rgba(37,211,102,0.3)"}}>
                💬 WhatsApp for Bulk Enquiry
              </a>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 28px",border:"1.5px solid rgba(13,148,136,0.4)",borderRadius:50,color:"rgba(240,250,248,0.7)",fontFamily:"'DM Sans',sans-serif",fontSize:14}}>
                📞 Call for same-day bulk
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{padding:"44px 8% 28px",background:"#1A2E2A",color:"rgba(240,250,248,0.8)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20,marginBottom:28}}>
          <div>
            <div style={{fontSize:18,fontWeight:700,letterSpacing:1.5,color:"white"}}>DHANUSHYA SEAFOODS</div>
            <div className="sans" style={{fontSize:11,color:"rgba(240,250,248,0.4)",marginTop:4,letterSpacing:2}}>HARBOUR FRESH · VIZAG</div>
          </div>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"
            style={{display:"flex",alignItems:"center",gap:8,padding:"10px 24px",background:"#25D366",borderRadius:50,color:"white",textDecoration:"none",fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:500}}>
            💬 Order on WhatsApp
          </a>
        </div>
        <div className="sans" style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:10,fontSize:11,color:"rgba(240,250,248,0.25)",borderTop:"1px solid rgba(255,255,255,0.08)",paddingTop:18}}>
          <span>© 2025 Dhanushya Seafoods · Visakhapatnam</span>
          <span>FSSAI Lic. No: XXXXXXXXXXXX</span>
          <span>All prices inclusive of GST</span>
        </div>
      </footer>

      {/* ── CART DRAWER (Fishing Bucket Theme) ── */}
      {cartOpen&&<div className="overlay" onClick={()=>setCartOpen(false)}/>}
      <div style={{
        position:"fixed",right:0,top:0,bottom:0,width:420,
        background:"#FDFAF6",zIndex:50,
        transform:cartOpen?"translateX(0)":"translateX(100%)",
        transition:"transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        display:"flex",flexDirection:"column",
        borderLeft:"1px solid rgba(13,148,136,0.15)",
        boxShadow:"-16px 0 50px rgba(0,0,0,0.1)",
      }}>
        {/* Cart header - big bucket visual */}
        <div style={{padding:"24px 24px 20px",borderBottom:"1px solid rgba(13,148,136,0.1)",background:"linear-gradient(135deg,#F0FAF8,#E6F7F5)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div>
              <div style={{fontSize:20,fontWeight:700,color:"#1A2E2A",marginBottom:2}}>Your Catch</div>
              <div className="sans" style={{fontSize:12,color:"#0D9488"}}>{count} item{count!==1?"s":""} in the bucket</div>
            </div>
            <button onClick={()=>setCartOpen(false)} style={{background:"none",border:"none",color:"#7A9E9A",fontSize:20,cursor:"pointer",padding:4}}>✕</button>
          </div>

          {/* Animated bucket in cart header */}
          <div style={{display:"flex",justifyContent:"center",marginTop:20}}>
            <div style={{position:"relative"}}>
              <div className="bucket-handle"/>
              <div className="bucket-body">
                <div className="bucket-stripe"/>
                <div className="bucket-shine"/>
                <div className="bucket-water" style={{height:`${Math.min(90,Math.max(10,count*15))}%`}}>
                  {count>0&&<div style={{position:"absolute",top:8,left:"50%",transform:"translateX(-50%)",width:50,height:16,borderRadius:"50%",border:"1.5px solid rgba(255,255,255,0.3)",animation:"ripple 2s ease-out infinite"}}/>}
                  {items.slice(0,3).map((item,i)=>(
                    <div key={item.id} className="bucket-fish" style={{left:`${20+i*28}%`,top:`${-14-i*4}px`,animationDelay:`${i*0.4}s`,fontSize:i===0?18:14}}>
                      {item.emoji}
                    </div>
                  ))}
                </div>
                {/* Label */}
                <div style={{position:"absolute",top:6,left:0,right:0,textAlign:"center"}}>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.85)",letterSpacing:1.5}}>DHANUSHYA</div>
                </div>
              </div>
              {count===0&&(
                <div className="sans" style={{position:"absolute",bottom:-24,left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap",fontSize:11,color:"#9ABAB6"}}>
                  Empty bucket!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Cart items */}
        <div style={{flex:1,overflowY:"auto",padding:"16px 24px"}}>
          {items.length===0?(
            <div style={{textAlign:"center",marginTop:50}}>
              <div style={{fontSize:48,marginBottom:12,opacity:0.3}}>🎣</div>
              <div className="sans" style={{color:"#9ABAB6",fontSize:14}}>Start fishing for fresh catch!</div>
              <button className="btn-teal" style={{padding:"10px 24px",fontSize:13,marginTop:20}}
                onClick={()=>{setCartOpen(false);document.getElementById("menu")?.scrollIntoView({behavior:"smooth"});}}>
                Browse Menu
              </button>
            </div>
          ):items.map(item=>(
            <div key={item.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,paddingBottom:16,borderBottom:"1px solid rgba(13,148,136,0.08)"}}>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <div style={{width:46,height:46,background:"#F0FAF8",borderRadius:12,overflow:"hidden",border:"1px solid rgba(13,148,136,0.1)"}}>
                  <img src={item.img} alt={item.name} style={{width:"100%",height:"100%",objectFit:"cover"}} onError={e=>{e.currentTarget.parentNode.innerHTML="🐟";e.currentTarget.parentNode.style.display="flex";e.currentTarget.parentNode.style.alignItems="center";e.currentTarget.parentNode.style.justifyContent="center";e.currentTarget.parentNode.style.fontSize="24px";}}/>
                </div>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:"#1A2E2A",marginBottom:2}}>{item.name}</div>
                  <div className="sans" style={{fontSize:11,color:"#9ABAB6"}}>{item.weight}</div>
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:15,fontWeight:700,color:"#0D9488",marginBottom:8}}>₹{item.price*item.qty}</div>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <button className="qty-btn" onClick={()=>rem(item.id)}>−</button>
                  <span className="sans" style={{fontSize:14,minWidth:20,textAlign:"center",fontWeight:600}}>{item.qty}</span>
                  <button className="qty-btn" onClick={()=>add(item.id)}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart footer */}
        {items.length>0&&(
          <div style={{padding:"16px 24px 24px",borderTop:"1px solid rgba(13,148,136,0.1)",background:"white"}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <span className="sans" style={{fontSize:14,color:"#4A6663"}}>Subtotal</span>
              <span style={{fontSize:20,fontWeight:700,color:"#0D9488"}}>₹{total}</span>
            </div>
            {total<399&&<div className="sans" style={{fontSize:12,color:"#E07B2A",marginBottom:10,padding:"8px 12px",background:"#FEF3E8",borderRadius:8}}>⚠ Minimum order ₹399 — add ₹{399-total} more</div>}
            {total>=399&&total<699&&<div className="sans" style={{fontSize:12,color:"#0D9488",marginBottom:10,padding:"8px 12px",background:"#F0FAF8",borderRadius:8}}>🎉 Add ₹{699-total} more for free delivery!</div>}
            {total>=699&&<div className="sans" style={{fontSize:12,color:"#0D9488",marginBottom:10,padding:"8px 12px",background:"#F0FAF8",borderRadius:8}}>✓ Free delivery unlocked!</div>}
            <button className="btn-teal" style={{width:"100%",padding:15,fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}
              onClick={waOrder} disabled={total<399}>
              <span>💬</span> Order via WhatsApp
            </button>
            <div className="sans" style={{textAlign:"center",fontSize:11,color:"#9ABAB6",marginTop:10}}>
              Opens WhatsApp with your order pre-filled
            </div>
          </div>
        )}
      </div>

      {/* ── FLOATING WA ── */}
      <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" style={{
        position:"fixed",bottom:28,right:28,zIndex:45,
        width:56,height:56,borderRadius:"50%",
        background:"linear-gradient(135deg,#25D366,#128C7E)",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:24,textDecoration:"none",
        boxShadow:"0 6px 20px rgba(37,211,102,0.35)",
        transition:"transform 0.2s",
      }}
      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.12)"}
      onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
        💬
      </a>
    </div>
  );
}
