import React, { useState, useEffect } from "react";
import "./Show.css";
import axios from "axios";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";
import animation from "../animation.json";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../redux/features/fetch";

const rankLabel = (rating) => {
  if (rating === null || rating === undefined)
    return { label: "Unrated", key: "unrated" };
  const r = Number(rating) || 0;
  if (r >= 2900) return { label: "Legendary GM", key: "legendary" };
  if (r >= 2600) return { label: "International GM", key: "int-gm" };
  if (r >= 2200) return { label: "Grandmaster", key: "grandmaster" };
  if (r >= 2050) return { label: "International Master", key: "int-master" };
  if (r >= 1900) return { label: "Master", key: "master" };
  if (r >= 1700) return { label: "Candidate Master", key: "cand-master" };
  if (r >= 1500) return { label: "Expert", key: "expert" };
  if (r >= 1350) return { label: "Specialist", key: "specialist" };
  if (r >= 1200) return { label: "Pupil", key: "pupil" };
  return { label: "Newbie", key: "newbie" };
};

const timeAgo = (timestamp) => {
  if (!timestamp) return "-";
  const then = new Date(timestamp);
  const diff = (Date.now() - then.getTime()) / 1000;
  if (diff < 60) return `${Math.floor(diff)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const Show = () => {
  const dat = useSelector((state) => state.mySlice.items) || [];
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [sortKey, setSortKey] = useState("rating");
  const [sortDir, setSortDir] = useState("desc");
  const [loading, setLoading] = useState(true);

  const databaseUrl = process.env.REACT_APP_URL || "";

  useEffect(() => {
    let mounted = true;

    const normalize = (source) =>
      (source || []).map((d) => ({
        handle: d.handle || d.memberHandle || "-",
        name: d.name || d.handle || d.memberName || "-",
        rating:
          typeof d.rating === "number"
            ? d.rating
            : d.rating || d.maxRating || 0,
        problemsSolved: d.solved || d.problemsSolved || d.problemCount || "-",
        lastSeen: d.lastOnlineTimeSeconds
          ? new Date(d.lastOnlineTimeSeconds * 1000).toISOString()
          : d.lastSeen || d.createdAt || null,
        rank: d.rank || d.title || null,
      }));

    async function ensureData() {
      try {
        if (dat && dat.length > 0) {
          setData(normalize(dat));
          setLoading(false);
          return;
        }

        const CACHE_KEY = "cf_cache";
        const SIX_HOURS = 1000 * 60 * 60 * 6;
        const raw = localStorage.getItem(CACHE_KEY);

        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            parsed &&
            parsed.timestamp &&
            Date.now() - parsed.timestamp < SIX_HOURS &&
            Array.isArray(parsed.data)
          ) {
            setData(normalize(parsed.data));
            dispatch(setData(parsed.data));
            setLoading(false);
            return;
          }
        }

        // Fetch fresh data from backend
        const res = await axios.get(`${databaseUrl}/show`);
        const info = res.data || [];
        const results = [];

        for (const ele of info) {
          const curr = ele.handle;
          try {
            const r = await axios.get(
              `https://codeforces.com/api/user.info?handles=${curr}&checkHistoricHandles=false`
            );
            const merged = {
              ...r.data.result[0],
              name: ele.name,
              createdAt: ele.createdAt,
            };
            results.push(merged);
          } catch (err) {
            console.warn("Codeforces fetch error for", curr, err);
          }
        }

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: results })
        );
        dispatch(setData(results));
        setData(normalize(results));
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    ensureData();

    return () => {
      mounted = false;
    };
  }, [dat, dispatch, databaseUrl]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const sorted = [...data].sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1;
      if (sortKey === "name") return dir * a.name.localeCompare(b.name);
      if (sortKey === "rating") return dir * ((a.rating || 0) - (b.rating || 0));
      if (sortKey === "problemsSolved")
        return dir * ((a.problemsSolved || 0) - (b.problemsSolved || 0));
      return 0;
    });
    setData(sorted);
  }, [sortKey, sortDir]);

  const toggleSort = (key) => {
    if (sortKey === key)
      setSortDir((s) => (s === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  return (
    <div className="leaderboard-root p-4 st">
      <div className="leaderboard-header text-center mb-6">
        <h2 className="leaderboard-title text-3xl font-bold">Leader Board</h2>
        <p className="leaderboard-sub text-gray-500">
          Track progress of your competitive programming companions
        </p>
      </div>

      {loading ? (
        <div className="loader flex justify-center items-center">
          <Player
            src={animation}
            loop
            autoplay
            className="player"
            style={{ height: "250px", width: "250px" }}
          />
        </div>
      ) : (
        <div className="table-wrap overflow-x-auto">
          <table className="leader-table w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white text-left">
                <th className="p-3 cursor-pointer">#</th>
                <th className="p-3 cursor-pointer" onClick={() => toggleSort("name")}>
                  Name{" "}
                  {sortKey === "name" ? (
                    sortDir === "asc" ? (
                      <FaSortUp className="inline" />
                    ) : (
                      <FaSortDown className="inline" />
                    )
                  ) : (
                    <FaSort className="inline" />
                  )}
                </th>
                <th className="p-3 cursor-pointer" onClick={() => toggleSort("problemsSolved")}>
                  Solved{" "}
                  {sortKey === "problemsSolved" ? (
                    sortDir === "asc" ? (
                      <FaSortUp className="inline" />
                    ) : (
                      <FaSortDown className="inline" />
                    )
                  ) : (
                    <FaSort className="inline" />
                  )}
                </th>
                <th className="p-3 cursor-pointer" onClick={() => toggleSort("rating")}>
                  Rating{" "}
                  {sortKey === "rating" ? (
                    sortDir === "asc" ? (
                      <FaSortUp className="inline" />
                    ) : (
                      <FaSortDown className="inline" />
                    )
                  ) : (
                    <FaSort className="inline" />
                  )}
                </th>
                <th className="p-3">CF Rank</th>
                <th className="p-3">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((row, idx) => (
                  <tr key={row.handle + idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{idx + 1}</td>
                    <td className="p-3">{row.name}</td>
                    <td className="p-3 text-center">{row.problemsSolved ?? "-"}</td>
                    <td className="p-3 text-center">{row.rating ?? "-"}</td>
                    <td className="p-3 text-center">
                      {(() => {
                        const r = row.rank
                          ? {
                              label: row.rank,
                              key: row.rank.toLowerCase().replace(/\s+/g, "-"),
                            }
                          : rankLabel(row.rating);
                        return (
                          <span className={`badge rank-${r.key}`}>
                            {r.label}
                          </span>
                        );
                      })()}
                    </td>
                    <td className="p-3 text-sm text-gray-500">
                      <div>{timeAgo(row.lastSeen)}</div>
                      <div>
                        {row.lastSeen
                          ? new Date(row.lastSeen).toLocaleString()
                          : "-"}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No users available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Show;
