# App to track and visualize expenses

## USER REQUIREMENTS
as an end user I need to
    MUST
    - use transactions from Allianz xmls - progres
        - create importer - done
        - store imported items to db - progress - 30 min
    - list and filter transactions, select many and batch edit, tag
        - UI - 1h
        - logic - 1h
    - define rules for automatic transaction tagging based on attributes - progress
        - manually run automatic transaction tagging for a given filter - 30min
        - rules UI - 1h
    - view charts for average, absolute expenses for tag and total for all tagged and untagged (daily for a month, and monthly for an year) - done

    SHOULD
    - insert new transactions manually
    - insert new transactions from scanned receipts 
        - jpegs processed by library

## ARCHITECTURE
Onion model - all interfaces and business logic in the core module which is self contained. All infrastructure implementations like data providers reference the core and depend on it.