function EditMenu({ restId, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">
          Edit Menu (Restaurant #{restId})
        </h2>

        <p className="text-gray-500">Menu editing form will be here 🍽</p>
      </div>
    </div>
  );
}

export default EditMenu;
