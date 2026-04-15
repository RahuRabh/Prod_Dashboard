interface DetailPanelProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

function DetailPanel({ isOpen, title, onClose, children }: DetailPanelProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/30 transition-opacity z-40 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800">{title}</h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-slate-100 text-slate-500 text-xl"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </>
  );
}

export default DetailPanel;
