import React from 'react';

const VeryLongSettings = () => {
    return (
        <div>
            Flexbox's alignment properties do "true" centering, unlike other centering methods in CSS. This means that
            the flex items will stay centered, even if they overflow the flex container.

            This can sometimes be problematic, however, if they overflow past the top edge of the page, or the left edge
            [...], as you can't scroll to that area, even if there is content there!

            In a future release, the alignment properties will be extended to have a "safe" option as well.

            For now, if this is a concern, you can instead use margins to achieve centering, as they'll respond in a
            "safe" way and stop centering if they overflow.

            Instead of using the align- properties, just put auto margins on the flex items you wish to center.

            Instead of the justify- properties, put auto margins on the outside edges of the first and last flex items
            in the flex container.

            The auto margins will "flex" and assume the leftover space, centering the flex items when there is leftover
            space, and switching to normal alignment when not.

            However, if you're trying to replace justify-content with margin-based centering in a multi-line flexbox,
            you're probably out of luck, as you need to put the margins on the first and last flex item on each line.
            Unless you can predict ahead of time which items will end up on which line, you can't reliably use
            margin-based centering in the main axis to replace the justify-content property.

            Flexbox's alignment properties do "true" centering, unlike other centering methods in CSS. This means that
            the flex items will stay centered, even if they overflow the flex container.

            This can sometimes be problematic, however, if they overflow past the top edge of the page, or the left edge
            [...], as you can't scroll to that area, even if there is content there!

            In a future release, the alignment properties will be extended to have a "safe" option as well.

            For now, if this is a concern, you can instead use margins to achieve centering, as they'll respond in a
            "safe" way and stop centering if they overflow.

            Instead of using the align- properties, just put auto margins on the flex items you wish to center.

            Instead of the justify- properties, put auto margins on the outside edges of the first and last flex items
            in the flex container.

            The auto margins will "flex" and assume the leftover space, centering the flex items when there is leftover
            space, and switching to normal alignment when not.

            However, if you're trying to replace justify-content with margin-based centering in a multi-line flexbox,
            you're probably out of luck, as you need to put the margins on the first and last flex item on each line.
            Unless you can predict ahead of time which items will end up on which line, you can't reliably use
            margin-based centering in the main axis to replace the justify-content property.


        </div>
    );
};

export default VeryLongSettings;