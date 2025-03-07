import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LinkProps } from "#/lib/types";
import Switch from "#/ui/switch";
import { motion } from "framer-motion";
import { FADE_IN_ANIMATION_SETTINGS } from "#/lib/constants";

export default function RemarkSection({
  props,
  data,
  setData,
}: {
  props?: LinkProps;
  data: LinkProps;
  setData: Dispatch<SetStateAction<LinkProps>>;
}) {
  const { remark } = data;
  const [enabled, setEnabled] = useState(!!remark);
  useEffect(() => {
    if (enabled) {
      // if enabling, add previous ios link if exists
      setData({
        ...data,
        remark: props?.remark || remark,
      });
    } else {
      // if disabling, remove ios link
      setData({ ...data, remark: null });
    }
  }, [enabled]);

  return (
    <div className="border-b border-gray-200 pb-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900">Add Remark</h2>
        <Switch fn={() => setEnabled(!enabled)} checked={enabled} />
      </div>
      {enabled && (
        <motion.div
          className="mt-3 flex rounded-md shadow-sm"
          {...FADE_IN_ANIMATION_SETTINGS}
        >
          <input
            name="remark"
            id="remark"
            type="text"
            placeholder="Remark..."
            value={remark || ""}
            onChange={(e) => {
              setData({ ...data, remark: e.target.value });
            }}
            className="block w-full rounded-md border-gray-300 text-sm text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500"
            aria-invalid="true"
          />
        </motion.div>
      )}
    </div>
  );
}
