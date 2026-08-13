function Contact({ darkMode, palette }) {
  const { ArrowUpRight } = window;

  return (
    <section id="contact" className="relative z-20 py-20 border-t" style={{ borderColor: darkMode ? palette.grey9 : palette.grey1 }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-6">
            <span className="text-xs font-mono-custom block mb-2" style={{ color: palette.highlight }}>
              04 // Inquire
            </span>
            <h2 className="text-2xl sm:text-4xl font-light tracking-tight mb-4">Let's Build Together</h2>
            <p className="text-sm leading-relaxed font-light mb-8" style={{ color: darkMode ? palette.grey3 : palette.grey9 }}>
              웹 프로젝트 협업, 프론트엔드 개발 의뢰, 또는 미니멀 UI 인터랙션 설계 관련 문의를 위한 커뮤니케이션 채널입니다.
            </p>

            <div className="font-mono-custom text-xs space-y-2" style={{ color: palette.grey7 }}>
              <div>Email: contact@knoblab.dev</div>
              <div>Location: Seoul, Korea</div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="p-8 space-y-4 font-mono-custom text-xs"
              style={{
                backgroundColor: darkMode ? palette.grey11 : palette.white,
                border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`
              }}
            >
              <div>
                <label className="block mb-2 font-normal" style={{ color: palette.grey7 }}>Your Name / Organization</label>
                <input
                  type="text"
                  placeholder="홍길동 / 팀명"
                  className="w-full p-3 outline-none transition-colors font-mono-custom"
                  style={{
                    backgroundColor: darkMode ? palette.black : palette.grey1,
                    border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`,
                    color: darkMode ? palette.white : palette.black
                  }}
                />
              </div>
              <div>
                <label className="block mb-2 font-normal" style={{ color: palette.grey7 }}>Contact Email</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  className="w-full p-3 outline-none transition-colors font-mono-custom"
                  style={{
                    backgroundColor: darkMode ? palette.black : palette.grey1,
                    border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`,
                    color: darkMode ? palette.white : palette.black
                  }}
                />
              </div>
              <div>
                <label className="block mb-2 font-normal" style={{ color: palette.grey7 }}>Project Message</label>
                <textarea
                  rows={3}
                  placeholder="프로젝트 주제 및 협업 요청 사항을 입력해 주세요."
                  className="w-full p-3 outline-none transition-colors font-sans"
                  style={{
                    backgroundColor: darkMode ? palette.black : palette.grey1,
                    border: `1px solid ${darkMode ? palette.grey9 : palette.grey3}`,
                    color: darkMode ? palette.white : palette.black
                  }}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 font-mono-custom font-semibold tracking-wider transition-opacity hover:opacity-90 flex items-center justify-center gap-2 text-white"
                style={{
                  backgroundColor: palette.highlight
                }}
              >
                <span>Send Message</span>
                {ArrowUpRight && <ArrowUpRight size={14} />}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

window.Contact = Contact;


