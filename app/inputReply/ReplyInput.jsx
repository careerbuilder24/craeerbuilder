export const ReplyInput = ({ value, onChange, onSubmit }) => (
    <div className="mt-2 flex flex-col">
        <textarea
            className="w-full p-2 border-2 border-gray-300 rounded-lg"
            placeholder="Reply..."
            value={value}
            onChange={onChange}
        ></textarea>
        <div className="flex justify-end mt-2">
            <button
                className="px-2 py-1 text-sm bg-[#17549A] text-white rounded-lg transition-all hover:bg-[#2CAAE1]"
                onClick={onSubmit}
            >
                Reply
            </button>
        </div>
    </div>
);
