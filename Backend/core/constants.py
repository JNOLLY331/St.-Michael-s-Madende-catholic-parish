ROLE_SUPER_ADMIN = "SUPER_ADMIN"
ROLE_PARISH_PRIEST = "PARISH_PRIEST"
ROLE_ASSISTANT_PRIEST = "ASSISTANT_PRIEST"
ROLE_SECRETARY = "SECRETARY"
ROLE_FINANCE = "FINANCE"
ROLE_MINISTRY_LEADER = "MINISTRY_LEADER"
ROLE_MEMBER = "MEMBER"
ROLE_VISITOR = "VISITOR"


EVENT_CATEGORIES = (
    ("HOLY_MASS", "Holy Mass"),
    ("SUNDAY_MASS", "Sunday Mass"),
    ("FEAST_DAY", "Feast Day"),
    ("RETREAT", "Retreat"),
    ("SEMINAR", "Seminar"),
    ("WORKSHOP", "Workshop"),
    ("YOUTH", "Youth Event"),
    ("CHOIR", "Choir"),
    ("MINISTRY", "Ministry Meeting"),
    ("CATECHISM", "Catechism"),
    ("BAPTISM", "Baptism"),
    ("CONFIRMATION", "Confirmation"),
    ("MARRIAGE", "Marriage"),
    ("FUNERAL", "Funeral"),
    ("CHARITY", "Charity"),
    ("GENERAL", "General"),
)

EVENT_STATUS = (
    ("DRAFT", "Draft"),
    ("PUBLISHED", "Published"),
    ("CANCELLED", "Cancelled"),
    ("COMPLETED", "Completed"),
)

NEWS_STATUS = (
    ("DRAFT", "Draft"),
    ("PUBLISHED", "Published"),
    ("ARCHIVED", "Archived"),
)

PRAYER_STATUS = (
    ("PENDING", "Pending"),
    ("UNDER_PRAYER", "Under Prayer"),
    ("ANSWERED", "Answered"),
    ("CLOSED", "Closed"),
)

PAYMENT_METHODS = (
    ("CASH", "Cash"),
    ("MPESA", "M-Pesa"),
    ("CARD", "Card"),
    ("BANK", "Bank Transfer"),
    ("PAYPAL", "PayPal"),
)

DONATION_STATUS = (
    ("PENDING", "Pending"),
    ("COMPLETED", "Completed"),
    ("FAILED", "Failed"),
    ("REFUNDED", "Refunded"),
)