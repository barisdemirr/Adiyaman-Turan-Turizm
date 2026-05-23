import LoadingState from '@/components/ui/LoadingState';

export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-white">
      
      <section id="home" className="relative h-[110vh] flex items-center justify-center overflow-hidden bg-slate-900 animate-pulse">
        <div className="text-center space-y-4 max-w-2xl px-4">
          <div className="h-12 bg-white/20 rounded-xl w-3/4 mx-auto" />
          <div className="h-6 bg-white/10 rounded-lg w-1/2 mx-auto" />
        </div>
      </section>

      <section id="hizli-rezervasyon" className="reveal relative z-20 -mt-6 md:-mt-12 px-4 md:px-6 max-w-5xl mx-auto">
        <div className="w-full h-24 bg-slate-100 rounded-2xl border border-slate-200 shadow-sm animate-pulse flex items-center justify-between p-6">
          <div className="h-10 bg-slate-200 rounded-lg w-1/4" />
          <div className="h-10 bg-slate-200 rounded-lg w-1/4" />
          <div className="h-10 bg-slate-200 rounded-lg w-1/4" />
        </div>
      </section>

      <section id="hizmetlerimiz" className="py-10 md:py-xl px-4 md:px-6 max-w-[1280px] mx-auto mt-10 md:mt-0 bg-surface">
        <div className="h-8 bg-slate-200 rounded-lg w-48 mb-8 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="h-48 bg-slate-100 rounded-xl animate-pulse" />
          <div className="h-48 bg-slate-100 rounded-xl animate-pulse" />
          <div className="h-48 bg-slate-100 rounded-xl animate-pulse" />
          <div className="h-48 bg-slate-100 rounded-xl animate-pulse" />
        </div>
      </section>

      <section id="favori-turlar" className="favorites-grid py-10 md:py-xl px-4 md:px-6 bg-secondary text-on-secondary">
        <div className="max-w-[1280px] mx-auto">
          <div className="h-8 bg-white/20 rounded-lg w-64 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-[400px] bg-white/10 rounded-2xl animate-pulse" />
            <div className="h-[400px] bg-white/10 rounded-2xl animate-pulse" />
            <div className="h-[400px] bg-white/10 rounded-2xl animate-pulse" />
          </div>
        </div>
      </section>

      <section id="turlar" className="md:py-xl bg-slate-50 px-4 md:px-6 border-y border-surface-variant/30 py-20 md:py-10">
        <div className="max-w-[1280px] mx-auto">
          <div className="h-8 bg-slate-200 rounded-lg w-52 mb-8 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-[420px] bg-slate-200/60 rounded-2xl animate-pulse" />
            <div className="h-[420px] bg-slate-200/60 rounded-2xl animate-pulse" />
            <div className="h-[420px] bg-slate-200/60 rounded-2xl animate-pulse" />
          </div>
        </div>
      </section>

      <section id="hakkimizda" className="py-10 md:py-xl px-4 md:px-6 bg-secondary text-on-secondary">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <div className="h-8 bg-white/20 rounded-lg w-40 animate-pulse" />
            <div className="h-4 bg-white/10 rounded w-full animate-pulse" />
            <div className="h-4 bg-white/10 rounded w-full animate-pulse" />
            <div className="h-4 bg-white/10 rounded w-5/6 animate-pulse" />
          </div>
          <div className="h-[350px] bg-white/10 rounded-2xl animate-pulse" />
        </div>
      </section>

      <section id="tur-fotograflari" className="py-20 md:py-10 md:py-xl px-4 md:px-6 bg-slate-50 border-y border-surface-variant/30 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          <div className="h-8 bg-slate-200 rounded-lg w-56 mb-8 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-slate-200/80 rounded-xl animate-pulse" />
            <div className="aspect-square bg-slate-200/80 rounded-xl animate-pulse" />
            <div className="aspect-square bg-slate-200/80 rounded-xl animate-pulse" />
            <div className="aspect-square bg-slate-200/80 rounded-xl animate-pulse" />
          </div>
        </div>
      </section>

      <section id="iletisim" className="py-10 md:py-xl px-4 md:px-6 bg-secondary text-on-secondary">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="h-8 bg-white/20 rounded-lg w-36 mx-auto animate-pulse" />
          <div className="h-12 bg-white/10 rounded-xl w-full animate-pulse" />
          <div className="h-32 bg-white/10 rounded-xl w-full animate-pulse" />
        </div>
      </section>

    </div>
  );
}