# SQLite commands
## Delete 'wrong' snapshots

``` sql
DELETE FROM wallet_balance_snapshot WHERE timestamp IN (SELECT timestamp FROM wallet_balance_snapshot GROUP BY wallet_balance_snapshot.timestamp HAVING SUM(wallet_balance_snapshot.value_in_EUR) < 3200)
```