import { useEffect, useRef, useState } from "react";
import { business } from "./business";
import { Icon } from "./components/Icon";
import { MaterialCard } from "./components/MaterialCard";
import type { IconName, Material } from "./types";
import { money } from "./utils/format";

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const localImg = (filename: string) => publicAsset(`img/${filename}`);
const businessIcon = publicAsset("icon/WhatsApp Image 2026-11-10 at 08.36.07.jpeg");
// Hero image: pakai foto terbaik besi/komponen (IMG_0049)
const heroImg = localImg("IMG_0049.jpg");
const materials: Material[] = [
  {
    id: "iron",
    name: "Besi tua",
    category: "Logam",
    price: 4500,
    unit: "kg",
    examples: "Potongan besi, rangka, pipa, dan perkakas rusak.",
    prep: "Pisahkan dari plastik, kayu, dan material nonlogam.",
    note: "Ketebalan, karat, dan campuran material memengaruhi harga.",
    image: localImg("IMG_0066.jpg"), // besi tua batangan
    icon: "metal",
    color: "stone",
  },
  {
    id: "plastic",
    name: "Botol plastik PET",
    category: "Plastik",
    price: 3000,
    unit: "kg",
    examples: "Botol air mineral dan kemasan minuman PET.",
    prep: "Kosongkan, keringkan, lalu pisahkan tutup dan label bila memungkinkan.",
    note: "Botol bening yang bersih biasanya dinilai berbeda dari botol berwarna.",
    image: localImg("IMG_0055.jpg"), // botol plastik PET
    icon: "bottle",
    color: "blue",
  },
  {
    id: "cardboard",
    name: "Kardus bekas",
    category: "Kertas",
    price: 1500,
    unit: "kg",
    examples: "Kardus paket, dus kemasan, dan lembaran karton bergelombang.",
    prep: "Lipat, ikat, dan simpan dalam keadaan kering.",
    note: "Kardus basah atau berminyak perlu dikonfirmasi terlebih dahulu.",
    image: localImg("IMG_0058.jpg"), // kardus tertumpuk
    icon: "box",
    color: "sand",
  },
  {
    id: "aluminum",
    name: "Aluminium",
    category: "Logam",
    price: 28000,
    unit: "kg",
    examples: "Kaleng aluminium, potongan kusen, dan peralatan aluminium rusak.",
    prep: "Pisahkan komponen besi, karet, dan plastik yang menempel.",
    note: "Aluminium kaleng, cor, dan profil memiliki penilaian berbeda.",
    image: localImg("IMG_0057.jpg"), // profil aluminium
    icon: "metal",
    color: "silver",
  },
  {
    id: "copper",
    name: "Tembaga",
    category: "Logam",
    price: 180000,
    unit: "kg",
    examples: "Potongan pipa tembaga dan kabel tembaga yang sudah terpisah.",
    prep: "Pisahkan dari material lain. Jangan membakar kabel untuk melepas isolasi.",
    note: "Harga bergantung pada kemurnian dan sisa isolasi kabel.",
    image: localImg("IMG_0048.jpg"), // kawat tembaga
    icon: "metal",
    color: "copper",
  },
  {
    id: "paper",
    name: "Kertas & koran",
    category: "Kertas",
    price: 1500,
    unit: "kg",
    examples: "Koran lama, kertas HVS, buku, dan arsip yang tidak terpakai.",
    prep: "Pastikan kering. Hancurkan dokumen pribadi sebelum diserahkan.",
    note: "Kertas berlapis plastik dan tisu tidak termasuk kategori ini.",
    image: localImg("IMG_0061.jpg"), // kertas/dokumen bekas
    icon: "box",
    color: "paper",
  },
  {
    id: "electronic",
    name: "Rongsok elektronik",
    category: "Elektronik",
    price: 0,
    unit: "unit",
    examples: "Perangkat elektronik rusak dan komponen elektronik bekas.",
    prep: "Hapus data pribadi. Jangan bongkar baterai, tabung CRT, atau komponen berbahaya.",
    note: "Wajib dicek pengepul terlebih dahulu. Tidak dihitung per kg dalam simulasi ini.",
    image: localImg("IMG_0064.jpg"), // PCB & komponen elektronik
    icon: "monitor",
    color: "sage",
  },
  {
    id: "tin-cap-badak",
    name: "Kaleng Cap Badak",
    category: "Logam",
    price: 20000,
    unit: "kg",
    examples: "Kaleng bekas Cap Badak dan kaleng logam sejenis.",
    prep: "Kosongkan dan pisahkan dari plastik atau material lain.",
    note: "Harga bergantung pada kebersihan dan jenis campuran logam.",
    image: localImg("IMG_0057.jpg"),
    icon: "metal",
    color: "silver",
  },
  {
    id: "battery",
    name: "Aki bekas",
    category: "Elektronik",
    price: 15000,
    unit: "kg",
    examples: "Aki kendaraan dan aki timbal-asam bekas.",
    prep: "Jangan dibongkar atau dibuang cairannya. Simpan tegak dan tanyakan cara penyerahan.",
    note: "Material berbahaya wajib dikonfirmasi terlebih dahulu sebelum diserahkan.",
    image: localImg("IMG_0064.jpg"),
    icon: "monitor",
    color: "sage",
  },
  {
    id: "brass",
    name: "Kuningan",
    category: "Logam",
    price: 100000,
    unit: "kg",
    examples: "Kran, fitting, dan potongan logam kuningan bekas.",
    prep: "Pisahkan dari besi, plastik, dan material lain yang menempel.",
    note: "Harga bergantung pada kemurnian dan campuran material.",
    image: localImg("IMG_0048.jpg"),
    icon: "metal",
    color: "copper",
  },
  {
    id: "cement",
    name: "Semen",
    category: "Lainnya",
    price: 2500,
    unit: "kg",
    examples: "Sisa semen dan semen yang masih dalam kemasan.",
    prep: "Simpan tetap kering dan pisahkan dari kemasan atau material lain.",
    note: "Konfirmasi penerimaan dan kondisi semen terlebih dahulu.",
    image: localImg("IMG_0058.jpg"),
    icon: "box",
    color: "sand",
  },
];
const categories: { label: string; icon: IconName }[] = [
  { label: "Semua material", icon: "recycle" },
  { label: "Logam", icon: "metal" },
  { label: "Plastik", icon: "bottle" },
  { label: "Kertas", icon: "box" },
  { label: "Elektronik", icon: "monitor" },
  { label: "Lainnya", icon: "box" },
];
type Channel = "WhatsApp" | "Instagram" | "Facebook" | "YouTube" | "TikTok";
type EstimateRow = { id: number; material: string; weight: string };

export default function App() {
  const [category, setCategory] = useState("Semua material");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [rows, setRows] = useState<EstimateRow[]>([{ id: 1, material: "iron", weight: "10" }]);
  const nextId = useRef(2);
  const [selected, setSelected] = useState<Material | null>(null);
  const [channel, setChannel] = useState<Channel | null>(null);
  const [contactMaterial, setContactMaterial] = useState<Material | null>(null);
  const [includeEstimate, setIncludeEstimate] = useState(false);
  const [copyState, setCopyState] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const modalOpen = Boolean(selected || channel);
  useEffect(() => {
    if (modalOpen) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [modalOpen]);
  const closeModal = () => {
    setSelected(null);
    setChannel(null);
    setCopyState("");
    setIncludeEstimate(false);
  };
  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };
  const getMaterial = (id: string) => materials.find((m) => m.id === id)!;
  const validWeight = (weight: string) =>
    Number.isFinite(Number(weight)) && Number(weight) > 0 && Number(weight) <= 100000;
  const isValid = rows.every((row) => validWeight(row.weight));
  const total = rows.reduce(
    (sum, row) =>
      sum + (validWeight(row.weight) ? Number(row.weight) * getMaterial(row.material).price : 0),
    0,
  );
  const totalWeight = rows.reduce(
    (sum, row) => sum + (validWeight(row.weight) ? Number(row.weight) : 0),
    0,
  );
  const filtered = materials.filter(
    (m) =>
      (category === "Semua material" || m.category === category) &&
      `${m.name} ${m.examples}`.toLowerCase().includes(query.toLowerCase()),
  );
  const visible =
    showAll || category !== "Semua material" || query ? filtered : filtered.slice(0, 3);
  const message = contactMaterial
    ? `Halo Admin, saya ingin menanyakan penerimaan ${contactMaterial.name.toLowerCase()}. Apakah material ini bisa dijual? Mohon informasi penilaian harga dan cara penyerahannya. Saya akan mengirim foto kondisi serta lokasi melalui chat.`
    : includeEstimate
      ? `Halo Admin, saya ingin menjual rongsokan.\n\n${rows.map((row) => `• ${getMaterial(row.material).name}: ${row.weight} kg`).join("\n")}\n\nEstimasi simulasi website: ${money(total)} (bukan harga penawaran final).\nMohon konfirmasi material yang diterima, harga terkini, dan pilihan penyerahan/penjemputan. Saya akan mengirim foto serta lokasi melalui chat.`
      : "Halo AdminS, saya ingin menanyakan apakah rongsokan saya bisa dijual. Mohon informasi material yang diterima, harga, dan cara penyerahannya. Saya siap mengirim foto, perkiraan berat, dan lokasi.";
  const canSendMessage = includeEstimate ? isValid : true;
  const contactUrl = (name: Channel) =>
    name === "WhatsApp"
      ? business.whatsapp
        ? `https://wa.me/${business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
        : ""
      : name === "Instagram"
        ? business.instagramUrl
        : name === "Facebook"
          ? business.facebookUrl
          : name === "YouTube"
            ? business.youtubeUrl
            : business.tiktokUrl;
  const openContact = (name: Channel, material: Material | null = null, withEstimate = false) => {
    setSelected(null);
    setContactMaterial(material);
    setIncludeEstimate(withEstimate);
    setCopyState("");
    setChannel(name);
  };
  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyState("Pesan berhasil disalin.");
    } catch {
      setCopyState("Tidak bisa menyalin otomatis. Pilih dan salin teks pesan di atas.");
    }
  };
  const updateRow = (id: number, key: "material" | "weight", value: string) =>
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [key]: value } : row)));

  return (
    <>
      <div className="announcement">
        <Icon name="leaf" size={14} />
        <span>Bersama Slemania Rongsok, rongsokanmu masih bernilai.</span>
        <a href="#cara-kerja">Kenali cara kerjanya ↗</a>
      </div>
      <header className="header">
        <div className="shell header-inner">
          <a href="#" className="brand" aria-label="Slemania Rongsok, beranda">
            <img
              src={businessIcon}
              alt="Slemania Rongsok"
              className="brand-logo-img"
            />
          </a>
          <nav className="desktop-nav" aria-label="Navigasi utama">
            <a href="#material" className="nav-active">
              Jenis & harga rongsok
            </a>
            <a href="#cara-kerja">Cara jual</a>
            <a href="#estimasi">Cek estimasi</a>
            <a href="#kontak">Kontak</a>
          </nav>
          <div className="header-actions">
            <button className="button button-dark compact" onClick={() => openContact("WhatsApp")}>
              <Icon name="whatsapp" size={17} />
              Hubungi Slemania Rongsok
            </button>
            <button
              className="icon-button mobile-toggle"
              aria-label="Buka navigasi"
              aria-expanded={mobileMenu}
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              <Icon name={mobileMenu ? "close" : "menu"} />
            </button>
          </div>
        </div>
        {mobileMenu && (
          <nav className="mobile-nav">
            {[
              ["material", "Jenis & harga rongsok"],
              ["cara-kerja", "Cara jual"],
              ["estimasi", "Cek estimasi"],
              ["kontak", "Kontak"],
            ].map(([id, label]) => (
              <button key={id} onClick={() => jumpTo(id)}>
                {label}
                <Icon name="arrow" size={16} />
              </button>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              DARI RONGSOK, JADI BERARTI.
            </div>
            <h1>
              Jangan dibuang.
              <br />
              <span>Jadikan uang.</span>
              <svg viewBox="0 0 360 15" className="headline-underline" aria-hidden="true">
                <path d="M3 10Q165-4 355 7M50 14Q200 5 308 11" />
              </svg>
            </h1>
            <p>
              Besi tua, kardus menumpuk, sampai botol plastik.
              <br className="desktop-break" /> Cek jenis dan perkiraan nilainya, lalu jual langsung
              <br className="desktop-break" /> ke Slemania Rongsok. Lebih beres, lebih bermanfaat.
            </p>
            <div className="hero-buttons">
              <a className="button button-orange" href="#estimasi">
                Cek nilai rongsokanmu <Icon name="arrow" size={18} />
              </a>
              <a className="text-link" href="#material">
                Lihat yang kami terima ↗
              </a>
            </div>
            <div className="hero-notes">
              <span>
                <Icon name="check" size={14} />
                Tak harus masih berfungsi
              </span>
              <span>
                <Icon name="check" size={14} />
                Dinilai dari materialnya
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src={heroImg}
              alt="Kumpulan roda gigi dan potongan besi tua yang dapat dipilah untuk daur ulang"
            />
            <div className="image-shade" />
            <div className="image-label">
              <span className="status-dot" />
              MATERIAL PILIHAN UNTUK DAUR ULANG
            </div>
            <div className="round-stamp">
              <Icon name="recycle" size={29} />
              <span>PILAH. TIMBANG.</span>
              <span>BERI NILAI LAGI.</span>
            </div>
            <div className="floating-card">
              <span className="floating-icon">
                <Icon name="scale" size={28} />
              </span>
              <div>
                <span>Yang menumpuk, bisa jadi pemasukan.</span>
                <strong>Kami lihat nilai materialnya.</strong>
                <p>Bukan merek, bukan tampilan, bukan kondisi baru.</p>
              </div>
              <a href="#material" aria-label="Lihat material rongsok">
                <Icon name="arrow" />
              </a>
            </div>
            <div className="image-caption">
              <span>Rongsokan hari ini. Bahan baku esok hari.</span>
              <Icon name="recycle" size={16} />
            </div>
          </div>
        </section>

        <div className="benefits shell">
          {[
            {
              icon: "metal" as IconName,
              title: "Rusak pun masih bernilai",
              text: "Dinilai berdasarkan jenis & kondisi material.",
            },
            {
              icon: "scale" as IconName,
              title: "Cek sebelum menjual",
              text: "Kenali material dan simulasikan nilainya.",
            },
            {
              icon: "chat" as IconName,
              title: "Langsung ke Slemania Rongsok",
              text: "Kirim foto dan diskusikan rongsokanmu lewat kanal kami.",
            },
          ].map((item) => (
            <div key={item.title}>
              <span className="benefit-icon">
                <Icon name={item.icon} size={25} />
              </span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="catalog shell" id="material">
          <div className="section-heading">
            <div>
              <div className="eyebrow">KENALI RONGSOKANMU</div>
              <h2>
                Bukan sampah. <span>Masih ada nilainya.</span>
              </h2>
              <p>Cari materialmu, siapkan dengan benar, lalu konsultasikan ke Slemania Rongsok.</p>
            </div>
            <span className="section-tag">
              <Icon name="recycle" size={15} />
              Siap dibantu Slemania Rongsok
            </span>
          </div>
          <div className="catalog-toolbar">
            <div className="categories" aria-label="Kategori material">
              {categories.map((c) => (
                <button
                  className={`category ${category === c.label ? "active" : ""}`}
                  key={c.label}
                  aria-pressed={category === c.label}
                  onClick={() => setCategory(c.label)}
                >
                  <Icon name={c.icon} size={17} />
                  {c.label}
                </button>
              ))}
            </div>
            <label className="search-field">
              <Icon name="search" size={17} />
              <input
                aria-label="Cari material"
                placeholder="Cari besi, kardus, plastik..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button aria-label="Hapus pencarian" onClick={() => setQuery("")}>
                  <Icon name="close" size={15} />
                </button>
              )}
            </label>
          </div>
          <div className="price-disclaimer">
            <Icon name="info" size={15} />
            <p>
              <strong>Harga di bawah adalah contoh simulasi, bukan harga beli resmi.</strong> Harga
              aktual dan penerimaan material harus dikonfirmasi ke Slemania Rongsok.
            </p>
          </div>
          <div className="material-grid">
            {visible.map((material) => (
              <MaterialCard key={material.id} material={material} onSelect={setSelected} />
            ))}
          </div>
          {!filtered.length && (
            <div className="empty-state">
              <Icon name="search" size={32} />
              <h3>Material belum ditemukan.</h3>
              <p>Coba kata kunci lain, atau tanyakan langsung ke Slemania Rongsok.</p>
              <button
                className="button button-outline"
                onClick={() => {
                  setQuery("");
                  setCategory("Semua material");
                }}
              >
                Tampilkan semua material
              </button>
            </div>
          )}
          {category === "Semua material" && !query && (
            <div className="catalog-more">
              <button className="button button-outline" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Tampilkan lebih ringkas" : "Lihat semua jenis rongsok"}
                <Icon name={showAll ? "chevron" : "arrow"} size={17} />
              </button>
              <span>
                Tidak menemukan materialmu?{" "}
                <button onClick={() => openContact("WhatsApp")}>
                  Tanyakan dulu ke Slemania Rongsok ↗
                </button>
              </span>
            </div>
          )}
        </section>

        <section className="estimate-section" id="estimasi">
          <div className="shell estimate-layout">
            <div className="estimate-copy">
              <div className="eyebrow">TAHU NILAINYA, SEBELUM MENJUAL</div>
              <h2>
                Rongsokan segini,
                <br />
                <span>kira-kira jadi berapa?</span>
              </h2>
              <p>
                Pilih material dan masukkan perkiraan beratnya. Kalkulator ini membantu memberi
                gambaran, bukan menentukan harga akhir.
              </p>
              <div className="estimate-tips">
                <span>
                  <Icon name="check" size={16} />
                  Bisa hitung beberapa material sekaligus
                </span>
                <span>
                  <Icon name="check" size={16} />
                  Pisahkan material agar lebih mudah ditimbang
                </span>
                <span>
                  <Icon name="check" size={16} />
                  Harga akhir setelah dicek & ditimbang Slemania Rongsok
                </span>
              </div>
              <div className="estimate-warning">
                <Icon name="info" size={19} />
                <p>
                  Elektronik, baterai, limbah berbahaya, dan material khusus perlu dikonfirmasi
                  langsung. Jangan dibongkar atau dibakar sendiri.
                </p>
              </div>
            </div>
            <div className="calculator">
              <div className="calculator-heading">
                <span className="calculator-symbol">
                  <Icon name="scale" size={22} />
                </span>
                <div>
                  <h3>Hitung estimasi rongsokan</h3>
                  <p>Harga contoh · bukan penawaran resmi</p>
                </div>
                <span className="simulation-tag">SIMULASI</span>
              </div>
              <div className="calculator-labels">
                <span>Jenis material</span>
                <span>Perkiraan berat</span>
              </div>
              <div className="calculator-rows">
                {rows.map((row, index) => (
                  <div className="calculator-row-wrap" key={row.id}>
                    <div className="calculator-row">
                      <select
                        aria-label={`Material ${index + 1}`}
                        value={row.material}
                        onChange={(e) => updateRow(row.id, "material", e.target.value)}
                      >
                        {materials
                          .filter((m) => m.price > 0)
                          .map((m) => (
                            <option value={m.id} key={m.id}>
                              {m.name}
                            </option>
                          ))}
                      </select>
                      <label
                        className={`weight-input ${!validWeight(row.weight) ? "invalid" : ""}`}
                      >
                        <input
                          type="number"
                          min="0.01"
                          max="100000"
                          step="any"
                          value={row.weight}
                          aria-label={`Berat material ${index + 1}`}
                          aria-invalid={!validWeight(row.weight)}
                          onChange={(e) => updateRow(row.id, "weight", e.target.value)}
                        />
                        <span>kg</span>
                      </label>
                      {rows.length > 1 && (
                        <button
                          className="remove-row"
                          aria-label={`Hapus material ${index + 1}`}
                          onClick={() => setRows((prev) => prev.filter((r) => r.id !== row.id))}
                        >
                          <Icon name="close" size={16} />
                        </button>
                      )}
                    </div>
                    <div className="row-rate">
                      {money(getMaterial(row.material).price)} / kg
                      {!validWeight(row.weight) && (
                        <span>Masukkan berat lebih dari 0, maksimal 100.000 kg.</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="add-material"
                onClick={() =>
                  setRows((prev) => [
                    ...prev,
                    { id: nextId.current++, material: "cardboard", weight: "" },
                  ])
                }
              >
                <Icon name="plus" size={15} />
                Tambah material lain
              </button>
              <div className="estimate-result" aria-live="polite">
                <div>
                  <span>Perkiraan nilai jual</span>
                  <strong>{isValid ? money(total) : "Lengkapi berat"}</strong>
                  <p>
                    {isValid
                      ? `${totalWeight.toLocaleString("id-ID")} kg dari ${rows.length} jenis pilihan material`
                      : "Isi berat yang valid untuk semua material."}
                  </p>
                </div>
                <Icon name="recycle" size={41} />
              </div>
              <p className="result-note">
                Hanya perkiraan dengan harga contoh. Berat bersih, jenis, kondisi material, dan
                harga pasar menentukan nilai akhir.
              </p>
              <button
                className="button button-dark calculator-cta"
                disabled={!isValid}
                onClick={() => openContact("WhatsApp", null, true)}
              >
                <Icon name="whatsapp" size={18} />
                Tanyakan estimasi ke Slemania Rongsok
                <Icon name="arrow" size={17} />
              </button>
            </div>
          </div>
        </section>

        <section className="how-section shell" id="cara-kerja">
          <div className="section-heading">
            <div>
              <div className="eyebrow">RUMAH LEBIH LEGA, MATERIAL LEBIH BERGUNA</div>
              <h2>
                Jual rongsok, <span>nggak perlu ribet.</span>
              </h2>
            </div>
            <p className="how-intro">
              Dari tumpukan di sudut rumah
              <br />
              ke tangan yang bisa mengolahnya.
            </p>
          </div>
          <div className="steps">
            {[
              {
                icon: "box" as IconName,
                title: "Pilah & cek material",
                text: "Pisahkan besi, plastik, kertas, dan material lainnya. Cek kategori yang ada di website.",
              },
              {
                icon: "chat" as IconName,
                title: "Kirim foto & tanya harga",
                text: "Hubungi Slemania Rongsok lewat WhatsApp atau sosial media. Sertakan foto, perkiraan berat, dan lokasi.",
              },
              {
                icon: "scale" as IconName,
                title: "Sepakati & timbang",
                text: "Konfirmasi harga, cara penyerahan, dan kemungkinan penjemputan langsung dengan Slemania Rongsok.",
              },
            ].map((step, i) => (
              <div className="step" key={step.title}>
                <div className="step-top">
                  <span>
                    <Icon name={step.icon} size={26} />
                  </span>
                  <b>0{i + 1}</b>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section shell" id="kontak">
          <div className="contact-copy">
            <div className="eyebrow">KAMI BANTU CEK RONGSOKANMU</div>
            <h2>
              Ragu ini bisa dijual?
              <br />
              <span>Tanya Slemania Rongsok dulu.</span>
            </h2>
            <p>
              Kirim foto material, perkiraan berat, dan lokasi.
              <br />
              Lanjutkan obrolan lewat kanal yang paling nyaman buatmu.
            </p>
            <div className="contact-footnote">
              <Icon name="info" size={15} />
              <span>
                {business.whatsapp ||
                business.instagramUrl ||
                business.facebookUrl ||
                business.youtubeUrl ||
                business.tiktokUrl
                  ? "Konfirmasi material dan layanan langsung ke Slemania Rongsok."
                  : "Nomor dan akun resmi Slemania Rongsok belum dicantumkan."}
              </span>
            </div>
          </div>
          <div className="contact-options">
            {[
              {
                name: "WhatsApp" as Channel,
                icon: "whatsapp" as IconName,
                text: "Diskusi material, harga, dan penyerahan",
              },
              {
                name: "Instagram" as Channel,
                icon: "instagram" as IconName,
                text: "Tanya melalui direct message",
              },
              {
                name: "Facebook" as Channel,
                icon: "facebook" as IconName,
                text: "Terhubung dengan Slemania Rongsok",
              },
              {
                name: "YouTube" as Channel,
                icon: "youtube" as IconName,
                text: "Lihat video dan informasi terbaru",
              },
              {
                name: "TikTok" as Channel,
                icon: "tiktok" as IconName,
                text: "Ikuti konten Slemania Rongsok",
              },
            ].map((c) => (
              <button
                className={`contact-option ${c.name === "WhatsApp" ? "primary-contact" : ""}`}
                key={c.name}
                onClick={() => openContact(c.name)}
              >
                <span className="channel-icon">
                  <Icon name={c.icon} size={24} />
                </span>
                <div>
                  <strong>{c.name}</strong>
                  <span>{c.text}</span>
                </div>
                <span className="external-arrow">↗</span>
              </button>
            ))}
          </div>
        </section>

        <section className="faq-section shell">
          <div>
            <div className="eyebrow">SEBELUM MENGHUBUNGI</div>
            <h2>
              Yang sering
              <br />
              <span>ditanyakan.</span>
            </h2>
          </div>
          <div className="faq-items">
            {[
              [
                "Apakah rongsokan harus masih bisa dipakai?",
                "Tidak. Fokusnya adalah nilai material untuk didaur ulang, bukan kelayakan barang untuk dijual kembali. Penerimaan tetap perlu dikonfirmasi ke pengepul.",
              ],
              [
                "Apakah harga di website sudah pasti?",
                "Belum. Semua angka saat ini adalah contoh untuk simulasi. Harga sebenarnya mengikuti jenis, kondisi, berat bersih, dan kesepakatan setelah pengecekan oleh pengepul.",
              ],
              [
                "Bisa dijemput ke rumah?",
                "Tanyakan langsung dengan menyertakan lokasi dan perkiraan jumlah rongsokan. Area layanan, minimal berat, jadwal, serta biaya penjemputan belum ditetapkan di website ini.",
              ],
              [
                "Material apa yang perlu ditanyakan dulu?",
                "Elektronik, baterai/aki, bahan kimia, tabung bertekanan, limbah medis, serta material berbahaya atau tercemar wajib dikonfirmasi. Jangan dicampur dengan rongsokan biasa atau dibongkar sendiri.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Icon name="plus" size={17} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="shell footer">
        <a href="#" className="brand">
          <img
            src={businessIcon}
            alt="Slemania Rongsok"
            className="brand-logo-img"
          />
        </a>
        <p>Slemania Rongsok — rongsokan berkurang, manfaat bertambah.</p>
        <span>
          © {new Date().getFullYear()} {business.name} Beri nilai, sekali lagi.
        </span>
        <a href="#kontak">Hubungi Slemania Rongsok ↗</a>
      </footer>

      <dialog
        ref={dialogRef}
        className={`modal ${selected ? "material-modal" : ""}`}
        aria-label={selected ? `Detail ${selected.name}` : `Hubungi melalui ${channel}`}
        onCancel={closeModal}
        onClose={closeModal}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <button className="modal-close icon-button" aria-label="Tutup dialog" onClick={closeModal}>
          <Icon name="close" />
        </button>
        {selected ? (
          <>
            <div className={`detail-visual ${selected.color}`}>
              {selected.image ? (
                <img src={selected.image} alt={selected.name} />
              ) : (
                <Icon name={selected.icon} size={80} />
              )}
            </div>
            <div className="modal-content">
              <div className="eyebrow">{selected.category} · MATERIAL RONGSOK</div>
              <h2>{selected.name}</h2>
              <p>{selected.examples}</p>
              <div className="detail-price">
                <span>CONTOH HARGA SIMULASI</span>
                <strong>
                  {selected.price ? (
                    <>
                      {money(selected.price)}
                      <small> / kg</small>
                    </>
                  ) : (
                    "Tanyakan ke pengepul"
                  )}
                </strong>
              </div>
              <div className="detail-tip">
                <Icon name="check" size={19} />
                <div>
                  <strong>Sebelum diserahkan</strong>
                  <p>{selected.prep}</p>
                </div>
              </div>
              <div className="detail-tip">
                <Icon name="info" size={19} />
                <div>
                  <strong>Perlu diperhatikan</strong>
                  <p>{selected.note}</p>
                </div>
              </div>
              <p className="detail-disclaimer">
                Penerimaan material dan harga beli sebenarnya belum dikonfirmasi. Foto hanya
                ilustrasi material.
              </p>
              <button
                className="button button-dark full-width"
                onClick={() => {
                  if (selected.price) {
                    setRows([{ id: nextId.current++, material: selected.id, weight: "10" }]);
                    closeModal();
                    jumpTo("estimasi");
                  } else openContact("WhatsApp", selected);
                }}
              >
                {selected.price ? "Hitung estimasi material ini" : "Tanyakan material ini"}
                <Icon name="arrow" size={17} />
              </button>
            </div>
          </>
        ) : (
          channel && (
            <div className="modal-content contact-modal-content">
              <span className="modal-symbol">
                <Icon
                  name={
                    channel === "WhatsApp"
                      ? "whatsapp"
                      : channel === "Instagram"
                        ? "instagram"
                        : channel === "Facebook"
                          ? "facebook"
                          : channel === "YouTube"
                            ? "youtube"
                            : "tiktok"
                  }
                  size={28}
                />
              </span>
              <div className="eyebrow">HUBUNGI PENGEPUL</div>
              <h2>Lanjut lewat {channel}.</h2>
              {contactUrl(channel) ? (
                <>
                  <p>
                    Kirim foto material dan lokasi agar Slemania Rongsok bisa membantu menilai
                    rongsokanmu.
                  </p>
                  {channel === "WhatsApp" && !canSendMessage ? (
                    <p className="unconfigured-note">
                      Lengkapi berat yang valid pada kalkulator terlebih dahulu agar pesan estimasi
                      tidak keliru.
                    </p>
                  ) : (
                    <a
                      className="button button-dark full-width"
                      href={contactUrl(channel)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Buka {channel}
                      <Icon name="arrow" size={17} />
                    </a>
                  )}
                </>
              ) : (
                <>
                  <div className="unconfigured-note">
                    <Icon name="info" size={19} />
                    <p>
                      <strong>Kontak resmi belum tersedia.</strong>
                      {channel === "WhatsApp"
                        ? " Nomor WhatsApp Slemania Rongsok belum dicantumkan."
                        : ` Tautan akun ${channel} Slemania Rongsok belum dicantumkan.`}{" "}
                      Tautan Slemania Rongsok akan aktif setelah kontak resmi dicantumkan.
                    </p>
                  </div>
                  <p>
                    Kamu tetap bisa menyiapkan pesan berikut untuk dikirim setelah kontak tersedia.
                  </p>
                </>
              )}
              {canSendMessage ? (
                <>
                  <label className="message-label" htmlFor="contact-message">
                    Pesan yang bisa kamu kirim
                  </label>
                  <textarea
                    id="contact-message"
                    className="contact-message"
                    value={message}
                    readOnly
                    rows={8}
                  />
                  <button className="button button-outline full-width" onClick={copyMessage}>
                    <Icon name="copy" size={17} />
                    Salin pesan estimasi
                  </button>
                  <p className="copy-status" role="status">
                    {copyState}
                  </p>
                </>
              ) : (
                <button
                  className="button button-outline full-width"
                  onClick={() => {
                    closeModal();
                    jumpTo("estimasi");
                  }}
                >
                  Lengkapi estimasi berat
                  <Icon name="arrow" size={17} />
                </button>
              )}
              <p className="privacy-note">
                Tidak ada data atau permintaan penjemputan yang dikirim melalui website ini.
              </p>
            </div>
          )
        )}
      </dialog>
    </>
  );
}
