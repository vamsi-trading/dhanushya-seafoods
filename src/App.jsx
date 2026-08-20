import { useState, useEffect } from "react";

const WHATSAPP = "919949682097"; // TODO: confirm this matches what's live on GitHub

// TODO: Upload IMG_1384.JPG (the illustrated harbour hero) to your GitHub repo's
// /public folder, then point this at it the same way your product photos work, e.g.:
// https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/harbour-hero.jpg
const HERO_IMAGE = "https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/harbour-hero.jpg";

const products = [
  { id:1,  name:"Seer Fish (Vanjaram)",  telugu:"వంజరం చేప",      weight:"500g", tag:"Bestseller",  cat:"Fresh Fish",    img:"https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/Seer%20Fish%20%28Vanjaram%29.png",     desc:"Cleaned & cut, pulusu-ready" },
  { id:3,  name:"Pomfret (Whole)",       telugu:"చందవ చేప",       weight:"500g", tag:"Premium",     cat:"Fresh Fish",    img:"https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/Pomfret%20%28Whole%29.png",        desc:"Tawa-ready, slit & cleaned" },
  { id:18, name:"Konam Fish (Barracuda)",telugu:"కోనం చేప",       weight:"500g", tag:"Fresh Today", cat:"Fresh Fish",    img:"https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/Konam%20fish.png",    desc:"Firm flesh, fry or curry cut" },
  { id:15, name:"Tuna",                  telugu:"తూన చేప",        weight:"500g", tag:"",            cat:"Fresh Fish",    img:"https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/Tuna.png",           desc:"Steak-cut, grill or curry" },
  { id:16, name:"Silver Pomfret",        telugu:"వెండి చందవ",     weight:"500g", tag:"Premium",     cat:"Fresh Fish",    img:"https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/Silver%20Pomfret.png", desc:"Whole cleaned, tawa-ready" },
  { id:17, name:"Lobster",               telugu:"లాబ్స్టర్",      weight:"500g", tag:"Special",     cat:"Fresh Fish",    img:"https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/Lobster.png",        desc:"Fresh, whole — pre-order advised" },
  { id:8,  name:"Squid (Cleaned)",       telugu:"కుండ చేప",       weight:"300g", tag:"",            cat:"Prawns & Crab", img:"https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/Squid%20%28Cleaned%29.png",          desc:"Cleaned, ring-cut, fry-ready" },
  { id:9,  name:"Tiger Prawns",          telugu:"పెద్ద రొయ్యలు",  weight:"500g", tag:"Premium",     cat:"Prawns & Crab", img:"https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/Tiger%20Prawns.png",   desc:"Fresh, large, deveined" },
  { id:10, name:"Medium Prawns",         telugu:"మధ్యస్థ రొయ్యలు",weight:"500g", tag:"",            cat:"Prawns & Crab", img:"https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/Medium%20Prawns.png",  desc:"Cleaned & deveined" },
  { id:11, name:"Small Prawns",          telugu:"చిన్న రొయ్యలు",  weight:"500g", tag:"",            cat:"Prawns & Crab", img:"https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/small%20prawns.png",   desc:"Cleaned, fry or curry use" },
  { id:12, name:"Mud Crab",              telugu:"బురద పీత",       weight:"500g", tag:"Fresh Today", cat:"Prawns & Crab", img:"https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/mud-crab.png",       desc:"Live-to-cleaned, same morning" },
  { id:13, name:"Blue Swimming Crab",    telugu:"నీలి పీత",       weight:"500g", tag:"",            cat:"Prawns & Crab", img:"https://raw.githubusercontent.com/vamsi-trading/dhanushya-seafoods/main/public/blue-crab.png",      desc:"Cleaned, curry-cut" },
];

const cats = ["All", "Fresh Fish", "Prawns & Crab"];

const featured = [
  { name:"Tiger Prawns",  img: products.find(p=>p.id===9).img,  tall:true },
  { name:"Silver Pomfret",img: products.find(p=>p.id===16).img, tall:false },
  { name:"Lobster",       img: products.find(p=>p.id===17).img, tall:false },
  { name:"Tuna",          img: products.find(p=>p.id===15).img, tall:false },
  { name:"Seer Fish",     img: products.find(p=>p.id===1).img,  tall:false },
];

const processSteps = [
  { title:"Harbour Catch", desc:"Hand-picked at the source, first pick of the morning." },
  { title:"Clean & Cut",   desc:"Scaled, cut to your preferred style — pulusu, tawa, or curry cut." },
  { title:"Weigh & Pack",  desc:"Timestamped, food-grade sealed, ready to go." },
  { title:"Fresh Delivery",desc:"Cold chain maintained the whole way to your door." },
];

export default function DhanushyaSeafoods() {
  const [activeCat, setActiveCat] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setVisible(v => ({ ...v, [e.target.dataset.id]: true })); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll("[data-id]").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const filtered = activeCat==="All" ? products : products.filter(p=>p.cat===activeCat);
  const reveal = (id, delay=0) => ({
    "data-id": id,
    style: { transition:`opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`, opacity: visible[id]?1:0, transform: visible[id]?"translateY(0)":"translateY(24px)" }
  });
  const closeMenu = () => setMenuOpen(false);

  return (
    <div style={{ fontFamily:"'DM Sans',sans-serif", background:"#F0EBDF", color:"#1C2422", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500&family=DM+Sans:wght@400;500;600&family=Noto+Sans+Telugu:wght@400;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        .display{font-family:'Fraunces',serif;}
        .sans{font-family:'DM Sans',sans-serif;}
        .eyebrow{font-size:11.5px;letter-spacing:3.5px;color:#E0B94A;font-weight:600;text-transform:uppercase;}
        .btn-gold{background:#E0B94A;color:#132420;padding:15px 32px;border-radius:2px;font-size:13px;font-weight:700;letter-spacing:0.5px;text-decoration:none;display:inline-block;border:none;cursor:pointer;}
        .btn-outline{border:1px solid rgba(243,238,221,0.4);color:#F3EEDD;padding:14px 28px;border-radius:2px;font-size:13px;font-weight:500;text-decoration:none;display:inline-block;background:transparent;cursor:pointer;}
        .btn-wa{background:#1EBE5D;color:white;text-decoration:none;font-family:'DM Sans',sans-serif;font-weight:500;border-radius:50px;padding:10px 22px;font-size:13px;display:inline-flex;align-items:center;gap:6px;}
        .card{background:#F8F4E5;border-radius:6px;border:1px solid rgba(19,36,32,0.08);overflow:hidden;transition:border-color 0.25s;}
        .card:hover{border-color:#E0B94A;}
        .cat-btn{font-family:'DM Sans',sans-serif;font-size:13px;padding:8px 20px;border-radius:6px;border:1px solid rgba(19,36,32,0.15);cursor:pointer;background:#F0EBDF;color:#5C6B72;}
        .cat-btn.active{background:#132420;color:#E0B94A;border-color:#132420;}
        .tag{font-size:10px;font-weight:600;padding:3px 9px;border-radius:4px;background:rgba(224,185,74,0.15);color:#8A6520;letter-spacing:0.5px;}
        section{padding-left:6%;padding-right:6%;}
        .nav-links-desktop{display:flex;gap:32px;align-items:center;}
        .nav-burger{display:none;}
        .mobile-menu-panel{display:none;}

        @media (max-width:900px){
          .hero-content h1{font-size:56px !important;}
          .hero-bottom-row{flex-direction:column;align-items:flex-start !important;gap:20px;}
          .overlap-card{flex-direction:column;gap:18px;padding:26px 24px !important;}
          .overlap-stat{border-left:none !important;padding-left:0 !important;border-top:1px solid rgba(19,36,32,0.1);padding-top:14px;}
          .overlap-stat:first-child{border-top:none;padding-top:0;}
          .bento{grid-template-columns:1fr !important;grid-template-rows:auto !important;}
          .bento-item.tall{grid-row:auto !important;}
          .bento-item img{height:220px !important;}
          .products-head{flex-direction:column;align-items:flex-start !important;gap:12px;}
          .products-head p{text-align:left !important;max-width:100% !important;}
          .quote-text{font-size:26px !important;}
          .process-row{flex-wrap:wrap;gap:12px !important;}
          .process-row .ptitle{width:auto !important;}
          .nav-links-desktop{display:none;}
          .nav-burger{display:flex !important;}
          .mobile-menu-panel.open{display:flex;}
          .grid-delivery{grid-template-columns:1fr !important;}
          .grid-catering{grid-template-columns:1fr !important;}
          footer{flex-direction:column;align-items:flex-start !important;gap:20px;}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"26px 6%",position:"absolute",top:0,left:0,right:0,zIndex:10 }}>
        <div className="display" style={{ fontSize:19,fontWeight:700,letterSpacing:0.5,color:"#F3EEDD" }}>
          DHANUSHYA <span style={{ color:"#E0B94A",fontWeight:400,fontSize:11,letterSpacing:2 }}>SEAFOODS</span>
        </div>
        <div className="nav-links-desktop sans" style={{ color:"#E4DFCF",fontSize:13 }}>
          {["Menu","Story","Catering","Delivery"].map(l=>(<a key={l} href={`#${l.toLowerCase()}`} style={{ color:"inherit",textDecoration:"none" }}>{l}</a>))}
        </div>
        <div style={{ display:"flex",gap:12,alignItems:"center" }}>
          <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi! Please share today's catch and prices")}`} target="_blank" rel="noreferrer"
            style={{ background:"rgba(243,238,221,0.12)",backdropFilter:"blur(6px)",border:"1px solid rgba(243,238,221,0.3)",color:"#F3EEDD",padding:"9px 20px",borderRadius:50,fontSize:13,fontWeight:500,textDecoration:"none" }}>
            Today's Rates
          </a>
          <button className="nav-burger" onClick={()=>setMenuOpen(o=>!o)} aria-label="Menu"
            style={{ width:38,height:38,border:"1px solid rgba(243,238,221,0.3)",borderRadius:6,background:"rgba(243,238,221,0.08)",display:"none",flexDirection:"column",gap:4,alignItems:"center",justifyContent:"center",cursor:"pointer" }}>
            <span style={{ width:16,height:1.5,background:"#F3EEDD" }}/>
            <span style={{ width:16,height:1.5,background:"#F3EEDD" }}/>
            <span style={{ width:16,height:1.5,background:"#F3EEDD" }}/>
          </button>
        </div>
      </nav>
      <div className={`mobile-menu-panel ${menuOpen?"open":""}`} style={{ position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:20,background:"#132420",flexDirection:"column",padding:"90px 6% 40px",gap:8 }}>
        <button onClick={closeMenu} style={{ position:"absolute",top:26,right:"6%",background:"none",border:"none",color:"#F3EEDD",fontSize:24,cursor:"pointer" }}>×</button>
        {["Menu","Story","Catering","Delivery"].map(l=>(
          <a key={l} href={`#${l.toLowerCase()}`} onClick={closeMenu} className="display"
            style={{ padding:"16px 4px",fontSize:24,color:"#F3EEDD",textDecoration:"none",borderBottom:"1px solid rgba(224,185,74,0.15)" }}>{l}</a>
        ))}
      </div>

      {/* HERO */}
      <div style={{ position:"relative",height:840,overflow:"hidden" }}>
        <img src={HERO_IMAGE} alt="Fishermen hauling the morning catch at Vizag harbour" style={{ position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover" }} />
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(180deg, rgba(19,36,32,0.55) 0%, rgba(19,36,32,0.25) 30%, rgba(19,36,32,0.85) 100%)" }}/>
        <div style={{ position:"absolute",inset:0,background:"linear-gradient(90deg, rgba(10,18,15,0.88) 0%, rgba(10,18,15,0.55) 42%, rgba(10,18,15,0) 68%)" }}/>
        <div className="hero-content" style={{ position:"relative",zIndex:2,height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 6% 90px" }}>
          <div className="eyebrow">VIZAG FISHING HARBOUR</div>
          <h1 className="display" style={{ fontSize:104,fontWeight:600,lineHeight:0.98,color:"#F8F4E5",margin:"18px 0 0",letterSpacing:-2,textShadow:"0 6px 30px rgba(0,0,0,0.65), 0 2px 10px rgba(0,0,0,0.75)" }}>
            Harbour to<br/><em style={{ color:"#F0C860",fontStyle:"italic",textShadow:"0 6px 30px rgba(0,0,0,0.7), 0 2px 10px rgba(0,0,0,0.85)" }}>Kitchen</em>
          </h1>
          <div className="hero-bottom-row" style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginTop:36 }}>
            <p className="sans" style={{ fontSize:15,color:"#D8D2BE",lineHeight:1.8,maxWidth:380 }}>
              Every morning since 1976, hundreds of boats have come in at Vizag's fishing harbour. We buy straight off the boats — no auction house, no middlemen.
            </p>
            <div style={{ display:"flex",gap:12,flexShrink:0 }}>
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="btn-outline">WhatsApp Us</a>
              <button className="btn-gold" onClick={()=>document.getElementById("menu")?.scrollIntoView({behavior:"smooth"})}>SHOP FRESH CATCH</button>
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAP STAT CARD */}
      <div className="overlap-card" style={{ position:"relative",zIndex:3,margin:"-86px 6% 0",background:"#F8F4E5",padding:"34px 40px",display:"flex",boxShadow:"0 20px 50px rgba(19,36,32,0.18)" }}>
        {[["1976","Harbour established"],["700+","Boats docked daily"],["Direct","Off the boat"],["Zero","Middlemen"]].map(([num,lbl],i)=>(
          <div key={num} className="overlap-stat" style={{ flex:1,padding: i===0?"0 28px 0 0":"0 28px",borderLeft: i===0?"none":"1px solid rgba(19,36,32,0.1)" }}>
            <div className="display" style={{ fontSize:34,fontWeight:600,color:"#132420" }}>{num}</div>
            <div className="sans" style={{ fontSize:11.5,color:"#6B6355",marginTop:4,letterSpacing:0.3 }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* FEATURED BENTO */}
      <section style={{ padding:"130px 6% 100px",background:"#F0EBDF" }}>
        <div className="products-head" style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:44 }}>
          <div>
            <div className="eyebrow">FRESH TODAY</div>
            <h2 className="display" style={{ fontSize:46,fontWeight:600,marginTop:10 }}>Today's Catch</h2>
          </div>
          <p className="sans" style={{ fontSize:13.5,color:"#6B6355",maxWidth:280,textAlign:"right",lineHeight:1.6 }}>
            Cleaned and cut to order. All items subject to availability — WhatsApp us each morning for the day's prices.
          </p>
        </div>
        <div className="bento" style={{ display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr",gridTemplateRows:"260px 260px",gap:14,maxWidth:1300,margin:"0 auto" }}>
          {featured.map((f)=>(
            <div key={f.name} className={`bento-item ${f.tall?"tall":""}`} style={{ position:"relative",overflow:"hidden",borderRadius:4, gridRow: f.tall?"1 / 3":"auto" }}>
              <img src={f.img} alt={f.name} style={{ width:"100%",height:"100%",objectFit:"cover",display:"block" }}/>
              <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"20px 22px",background:"linear-gradient(0deg, rgba(19,36,32,0.85) 0%, rgba(19,36,32,0) 100%)" }}>
                <div className="display" style={{ fontWeight:600,fontSize:19,color:"#F8F4E5" }}>{f.name}</div>
                <div className="sans" style={{ fontSize:11.5,color:"#E0B94A",marginTop:2 }}>WhatsApp to enquire</div>
              </div>
            </div>
          ))}
        </div>
      </section>

     {/* QUOTE */}
      <section id="story" style={{ padding:"110px 6%",background:"#132420" }}>
        <div style={{ maxWidth:920,margin:"0 auto" }}>
          <div style={{ maxWidth:820 }}>
            <div className="eyebrow">WHY DHANUSHYA</div>
            <div className="display quote-text" style={{ fontStyle:"italic",fontSize:44,lineHeight:1.3,color:"#F3EEDD",margin:"22px 0 30px" }}>
              "Between the boat and your kitchen, there's <em style={{ color:"#E0B94A" }}>just us</em> — no warehouse, no middlemen."
            </div>
            <div className="sans" style={{ fontSize:13,color:"#8FA39C" }}>
              Every pack carries its own timestamp — caught, cleaned, and packed the same day, not shipped from a warehouse.
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding:"90px 6% 100px",background:"#F0EBDF" }}>
        <div className="eyebrow">THE PROCESS</div>
        <h2 className="display" style={{ fontSize:44,fontWeight:600,marginTop:10 }}>From Sea to Your Plate</h2>
        <div style={{ maxWidth:900,margin:"50px auto 0" }}>
          {processSteps.map((s,i)=>(
            <div key={s.title} className="process-row" style={{ display:"flex",alignItems:"baseline",gap:32,padding:"28px 0",borderBottom:"1px solid rgba(19,36,32,0.1)" }}>
              <div className="display" style={{ fontSize:52,fontWeight:600,color:"rgba(19,36,32,0.12)",width:80,flexShrink:0 }}>{String(i+1).padStart(2,"0")}</div>
              <div className="display ptitle" style={{ fontSize:22,fontWeight:600,width:200,flexShrink:0 }}>{s.title}</div>
              <div className="sans" style={{ fontSize:13.5,color:"#6B6355",lineHeight:1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FULL MENU */}
      <section id="menu" style={{ padding:"90px 6%",background:"#F8F4E5" }}>
        <div style={{ textAlign:"center",marginBottom:40 }}>
          <div className="eyebrow" style={{ textAlign:"center" }}>BROWSE</div>
          <h2 className="display" style={{ fontSize:38,fontWeight:600,marginTop:10 }}>Full Menu</h2>
          <p className="sans" style={{ fontSize:14,color:"#6B6355",marginTop:10 }}>All items subject to availability · WhatsApp us for today's prices</p>
        </div>
        <div style={{ display:"flex",gap:10,justifyContent:"center",marginBottom:40,flexWrap:"wrap" }}>
          {cats.map(c=>(<button key={c} className={`cat-btn ${activeCat===c?"active":""}`} onClick={()=>setActiveCat(c)}>{c}</button>))}
        </div>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:18,maxWidth:1200,margin:"0 auto" }}>
          {filtered.map((p,i)=>(
            <div key={p.id} {...reveal(`p${p.id}`,i*40)} className="card">
              <div style={{ height:160,overflow:"hidden",position:"relative",background:"#EFE8D8" }}>
                <img src={p.img} alt={p.name} style={{ width:"100%",height:"100%",objectFit:"cover" }} onError={e=>{e.currentTarget.style.display="none";}}/>
                {p.tag && <span className="tag" style={{ position:"absolute",top:10,right:10 }}>{p.tag}</span>}
              </div>
              <div style={{ padding:"16px 16px 18px" }}>
                <div className="display" style={{ fontSize:15,fontWeight:600 }}>{p.name}</div>
                <div style={{ fontSize:13,color:"#B5872E",fontFamily:"'Noto Sans Telugu',sans-serif",marginTop:2 }}>{p.telugu}</div>
                <div className="sans" style={{ fontSize:12,color:"#8A8272",margin:"4px 0 14px" }}>{p.weight} · {p.desc}</div>
                <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Hi! I'm interested in ${p.name} (${p.weight}). What's today's price and availability?`)}`} target="_blank" rel="noreferrer" className="btn-wa">Order</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" style={{ padding:"90px 6%",background:"#F0EBDF" }}>
        <div style={{ textAlign:"center",marginBottom:44 }}>
          <div className="eyebrow" style={{ textAlign:"center" }}>COVERAGE</div>
          <h2 className="display" style={{ fontSize:38,fontWeight:600,marginTop:10 }}>Delivery Areas & Slots</h2>
        </div>
        <div className="grid-delivery" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:28,maxWidth:860,margin:"0 auto" }}>
          <div className="card" style={{ padding:"30px 26px" }}>
            <div className="display" style={{ fontSize:18,fontWeight:600 }}>Delivery Zones</div>
            <div className="sans" style={{ fontSize:13,color:"#B5872E",fontWeight:600,margin:"6px 0 16px" }}>All Areas Across Visakhapatnam</div>
            {["MVP Colony","Seethammadhara","Madhurawada","Rushikonda","PM Palem","Dwaraka Nagar","Gajuwaka","Bheemunipatnam","Kommadi","Lawsons Bay","Siripuram","NAD Junction"].map(z=>(
              <div key={z} className="sans" style={{ fontSize:13,color:"#5C6B72",marginBottom:8 }}>— {z}</div>
            ))}
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
            <div className="card" style={{ padding:"26px 24px" }}>
              <div className="display" style={{ fontSize:17,fontWeight:600 }}>Evening Slot</div>
              <div className="sans" style={{ fontSize:13,color:"#8A8272",marginTop:6 }}>Order earlier in the day for same-day delivery</div>
            </div>
            <div className="card" style={{ padding:"26px 24px" }}>
              <div className="display" style={{ fontSize:17,fontWeight:600 }}>Morning Slot</div>
              <div className="sans" style={{ fontSize:13,color:"#8A8272",marginTop:6 }}>Order the night before for morning delivery</div>
            </div>
            <div className="sans" style={{ fontSize:13,color:"#6B6355",textAlign:"center" }}>Free delivery above ₹699 · ₹39 below · Min order ₹399</div>
          </div>
        </div>
      </section>

      {/* CATERING */}
      <section id="catering" style={{ padding:"90px 6%",background:"#132420" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div style={{ textAlign:"center",marginBottom:52 }}>
            <div className="eyebrow" style={{ textAlign:"center" }}>LARGE ORDERS WELCOME</div>
            <h2 className="display" style={{ fontSize:38,fontWeight:600,color:"#F3EEDD",marginTop:10 }}>Catering & Functions</h2>
            <p className="sans" style={{ fontSize:14,color:"#8FA39C",maxWidth:480,margin:"12px auto 0" }}>Marriages, housewarming, corporate events — fresh seafood in any quantity, no minimum order.</p>
          </div>
          <div className="grid-catering" style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:20,marginBottom:36 }}>
            {[["Marriages & Receptions","Cleaned and portioned for your caterer, delivered the morning of the function."],
              ["Housewarming","We coordinate timing with your kitchen staff so everything is fresh when cooking begins."],
              ["Corporate & Bulk","Regular large-volume supply for canteens, hotels, and event caterers."]].map(([t,d])=>(
              <div key={t} style={{ background:"rgba(224,185,74,0.06)",border:"1px solid rgba(224,185,74,0.15)",padding:"26px 24px" }}>
                <div className="display" style={{ fontSize:17,fontWeight:600,color:"#F3EEDD",marginBottom:8 }}>{t}</div>
                <p className="sans" style={{ fontSize:13,color:"#8FA39C",lineHeight:1.7 }}>{d}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:"center" }}>
            <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Dhanushya Seafoods! I need to enquire about bulk/catering supply for a function.")}`} target="_blank" rel="noreferrer" className="btn-wa" style={{ fontSize:14,padding:"14px 30px" }}>WhatsApp for Bulk Enquiry</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:"#132420",color:"#8FA39C",padding:"60px 6% 30px",display:"flex",justifyContent:"space-between",alignItems:"flex-end" }}>
        <div>
          <div className="display" style={{ color:"#F3EEDD",fontSize:22,fontWeight:700 }}>DHANUSHYA SEAFOODS</div>
          <div className="sans" style={{ fontSize:11,color:"#E0B94A",letterSpacing:2,marginTop:8 }}>HARBOUR FRESH · VIZAG</div>
        </div>
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="btn-gold" style={{ padding:"13px 28px" }}>Order on WhatsApp</a>
      </footer>
    </div>
  );
}
