import { useAppDispatch, useAppSelector } from "../hooks/useCartDispatch";
import { closeModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

function Modal() {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.modal);

  // isOpen이 false면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  return (
    // 배경 오버레이
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* 모달 박스 */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-80 flex flex-col items-center gap-4">
        <p className="text-lg font-bold text-gray-800">정말 삭제하시겠어요?</p>
        <p className="text-sm text-gray-500">전체 음반이 장바구니에서 제거돼요</p>

        <div className="flex gap-3 mt-2 w-full">
          {/* 아니요 → closeModal만 dispatch */}
          <button
            onClick={() => dispatch(closeModal())}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600
                       text-sm font-semibold hover:bg-gray-50 active:scale-95 transition-all"
          >
            아니요
          </button>

          {/* 네 → clearCart + closeModal dispatch */}
          <button
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
            className="flex-1 py-2.5 rounded-xl bg-red-500 text-white
                       text-sm font-semibold hover:bg-red-600 active:scale-95 transition-all"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
