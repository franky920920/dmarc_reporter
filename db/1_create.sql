create table if not exists item
(
    item_id          int auto_increment
        primary key,
    item_report_id   varchar(255)                                                                                       null,
    item_ip          varchar(255)                                                                                       not null,
    item_count       int                                                                                                not null,
    item_disposition enum ('none', 'quarantine', 'reject')                                                              null,
    item_dkim_domain varchar(255)                                                                                       null,
    item_dkim_result enum ('none', 'pass', 'fail', 'policy', 'neutral', 'temperror', 'permerror')                       null,
    item_policy_dkim enum ('pass', 'fail')                                                                              null,
    item_spf_domain  varchar(255)                                                                                       null,
    item_spf_result  enum ('none', 'neutral', 'pass', 'fail', 'softfail', 'temperror', 'permerror', 'unknown', 'error') null,
    item_policy_spf  enum ('pass', 'fail')                                                                              null,
    item_reason      varchar(255)                                                                                       null,
    item_header_from varchar(255)                                                                                       null,
    item_created_at  timestamp default CURRENT_TIMESTAMP                                                                null
);

create index item_report_id_ip_index
    on item (item_report_id, item_ip);

create table if not exists report
(
    report_id                 varchar(255)                        not null
        primary key,
    report_begin_date         timestamp default CURRENT_TIMESTAMP not null,
    report_end_date           timestamp                           null,
    report_domain             varchar(255)                        not null,
    report_org_name           varchar(255)                        not null,
    report_email              varchar(255)                        null,
    report_extra_contact_info varchar(255)                        null,
    report_policy_adkim       varchar(1)                          null,
    report_policy_aspf        varchar(1)                          null,
    report_policy_p           varchar(255)                        null,
    report_policy_sp          varchar(255)                        null,
    report_policy_pct         int       default 0                 not null,
    report_created_at         timestamp default CURRENT_TIMESTAMP null,
    constraint report_domain_index
        unique (report_domain, report_id),
    constraint report_order_index
        unique (report_id, report_begin_date, report_end_date, report_org_name)
);

