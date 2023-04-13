﻿using System;

namespace MOMShop.Utils.HistoryUpdate
{
    public class HistoryUpdateDto
    {
        public string Table { get; set; }
        /// <summary>
        /// Id của bảng đó là bao nhiêu
        /// </summary>
        public int ReferId { get; set; }
        /// <summary>
        /// Cột update là gì
        /// </summary>
        public string ColumnUpdate { get; set; }
        /// <summary>
        /// Giá trị cũ
        /// </summary>
        public string OldValue { get; set; }
        /// <summary>
        /// Giá trị mới
        /// </summary>
        public string NewValue { get; set; }
        /// <summary>
        /// Ngày tạo thay đổi
        /// </summary>
        public DateTime CreatedDate { get; set; }
    }
}
